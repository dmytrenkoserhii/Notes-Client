import { Container, Stack } from '@mantine/core';
import React from 'react';
import { NoteItem } from './note-item';
import { DUMMY_NOTES } from '../../../DUMMY_DATA';
import { Note } from '../types';

export const NoteItemsList: React.FC = () => {
  const [notes, setNotes] = React.useState(DUMMY_NOTES.items);

  const handleNoteUpdate = (updatedNote: Note) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    <Stack mt={20}>
      {notes.map((note) => (
        <Container key={note.id}>
          <NoteItem note={note} onUpdate={handleNoteUpdate} />
        </Container>
      ))}
    </Stack>
  );
};
