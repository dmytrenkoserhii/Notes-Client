import { Center, Container, Loader, Stack } from '@mantine/core';
import React from 'react';
import { NoteItem } from './note-item';
import { useSearchParams } from 'react-router-dom';
import { getCurrentQueryParams } from '../../../utils';
import { NotesQueryParams } from '../types';
import { useQuery } from '@tanstack/react-query';
import { NotesService } from '../services';
import { NoteViewContext } from '../../../contexts';

export const NoteItemsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery } = React.useContext(NoteViewContext);

  const queryParams = React.useMemo(() => {
    return getCurrentQueryParams(searchParams);
  }, [searchParams]);

  const requestQueryParams: NotesQueryParams = {
    limit: queryParams.limit,
    page: queryParams.page,
  };

  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', requestQueryParams],
    queryFn: () => {
      if (!requestQueryParams.limit || !requestQueryParams.page) return;

      return NotesService.getAllNotes(requestQueryParams);
    },
  });

  React.useEffect(() => {
    if (!queryParams.limit && !queryParams.page) {
      setSearchParams(
        {
          ...queryParams,
          limit: queryParams.limit || '16',
          page: queryParams.page || '1',
        },
        {
          replace: true,
        }
      );

      return;
    }
  }, []);

  const filteredNotes = React.useMemo(() => {
    if (!notesData?.items) return [];
    return notesData.items.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notesData?.items, searchQuery]);

  if (isLoading) {
    return (
      <Center h="50vh">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Stack mt={20}>
      {filteredNotes.map((note) => (
        <Container key={note.id}>
          <NoteItem note={note} />
        </Container>
      ))}
    </Stack>
  );
};
