import { Box, Flex } from '@mantine/core';
import React from 'react';
import { Sort } from '../components';
import { NoteCardsList } from '../components/note-cards-list';
import { CreateNoteForm } from '../components/create-note-form';
import { NoteItemsList } from '../components/note-items-list';

export const NotesPage: React.FC = () => {
  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Box w="33%" />

        <CreateNoteForm />

        <Box w="33%" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Sort />
        </Box>
      </Flex>

      <NoteCardsList />
      <NoteItemsList />
    </Box>
  );
};
