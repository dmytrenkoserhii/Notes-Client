import { Card, Stack, Text, Title } from '@mantine/core';
import React, { useState } from 'react';
import { Note } from '../types/note.interface';
import { ModalNoteForm } from './modal-note-form';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        w={250}
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
              WebkitLineClamp: 2,
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
