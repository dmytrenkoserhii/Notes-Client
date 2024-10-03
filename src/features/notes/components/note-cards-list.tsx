import { Grid } from '@mantine/core';
import React, { useState } from 'react';
import { NoteCard } from './note-card';
import { DUMMY_NOTES } from '../../../DUMMY_DATA';
import { Note } from '../types/note.interface';

export const NoteCardsList: React.FC = () => {
  const [notes, setNotes] = useState(DUMMY_NOTES.items);

  const handleNoteUpdate = (updatedNote: Note) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return (
    <Grid mt={20}>
      {notes.map((note) => (
        <Grid.Col span={3} key={note.id}>
          <NoteCard note={note} onUpdate={handleNoteUpdate} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
