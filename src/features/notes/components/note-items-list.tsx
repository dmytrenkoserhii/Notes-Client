import { Center, Container, Loader, Stack } from '@mantine/core';
import React from 'react';
import { NoteItem } from './note-item';
import { Note } from '../types';
import { NoteViewContext } from '../../../contexts';

interface NoteCardsListProps {
  notes: Note[];
  isLoading: boolean;
}

export const NoteItemsList: React.FC<NoteCardsListProps> = ({
  notes,
  isLoading,
}) => {
  const { searchQuery } = React.useContext(NoteViewContext);

  const filteredNotes = React.useMemo(() => {
    if (!notes) return [];
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  if (isLoading) {
    return (
      <Center h='50vh'>
        <Loader size='xl' />
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
