import { Box, Flex } from '@mantine/core';
import React from 'react';
import { Sort } from '../components';
import { NoteCardsList } from '../components/note-cards-list';
import { CreateNoteForm } from '../components/create-note-form';
import { NoteItemsList } from '../components/note-items-list';
import { NoteViewContext } from '../../../contexts';

export const NotesPage: React.FC = () => {
  const { isGridView } = React.useContext(NoteViewContext);

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Box w="33%" />

        <CreateNoteForm />

        <Box w="33%" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Sort />
        </Box>
      </Flex>

      {isGridView ? <NoteCardsList /> : <NoteItemsList />}
    </Box>
  );
};
