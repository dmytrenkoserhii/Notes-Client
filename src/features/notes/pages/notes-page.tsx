import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Flex } from '@mantine/core';
import {
  NoteCardsList,
  CreateNoteForm,
  NoteItemsList,
  Sort,
} from '../components';
import { NoteViewContext } from '../../../contexts';
import { getCurrentQueryParams } from '../../../utils';
import { NotesService } from '../services';
import { NotesQueryParams } from '../types';
import { SORT_OPTIONS } from '../constants';

export const NotesPage: React.FC = () => {
  const { isGridView } = React.useContext(NoteViewContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (value: string) => {
    setSearchParams(
      {
        ...queryParams,
        sort: value,
      },
      {
        replace: true,
      }
    );
  };

  const queryParams = React.useMemo(() => {
    return getCurrentQueryParams(searchParams);
  }, [searchParams]);

  const requestQueryParams: NotesQueryParams = {
    limit: queryParams.limit,
    page: queryParams.page,
    sort: queryParams.sort,
    isDeleted: false,
  };

  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', requestQueryParams],
    queryFn: () => {
      if (
        !requestQueryParams.limit ||
        !requestQueryParams.page ||
        !requestQueryParams.sort
      )
        return;

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
          sort: queryParams.sort || SORT_OPTIONS[0].value,
        },
        {
          replace: true,
        }
      );

      return;
    }
  }, []);

  return (
    <Box>
      <Flex justify='space-between' align='center'>
        <Box w='33%' />

        <CreateNoteForm />

        <Box w='33%' style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Sort value={queryParams.sort} onSortChange={handleSortChange} />
        </Box>
      </Flex>

      {isGridView
        ? notesData && (
            <NoteCardsList notes={notesData?.items} isLoading={isLoading} />
          )
        : notesData && (
            <NoteItemsList notes={notesData?.items} isLoading={isLoading} />
          )}
    </Box>
  );
};
