import { Center, Grid, Loader } from '@mantine/core';
import React from 'react';
import { NoteCard } from './note-card';
import { Note } from '../types';
import { NoteViewContext } from '../../../contexts';

interface NoteCardsListProps {
  notes: Note[];
  isLoading: boolean;
}

export const NoteCardsList: React.FC<NoteCardsListProps> = ({
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
      <Center h="50vh">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Grid mt={20}>
      {filteredNotes.map((note) => (
        <Grid.Col span={3} key={note.id}>
          <NoteCard note={note} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
