import React from 'react';
import { Text, Card, Stack, Title } from '@mantine/core';
import { Note } from '../types/note.interface';
import { ModalNoteForm } from './modal-note-form';

interface NoteItemProps {
  note: Note;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        w={600}
        mih={100}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <Stack gap="xs" style={{ flex: 1 }}>
          <Title
            order={5}
            lineClamp={2}
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {note.title}
          </Title>
          <Text
            size="sm"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              flex: 1,
            }}
          >
            {note.content}
          </Text>
        </Stack>
      </Card>
      <ModalNoteForm
        note={note}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
