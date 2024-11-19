import { Card, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { Note } from '../types/note.interface';
import { ModalNoteForm } from './modal-note-form';
import { NoteViewContext } from '../../../contexts';
import { HighlightedText } from './highlighted-text';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { searchQuery } = React.useContext(NoteViewContext);

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
            <HighlightedText text={note.title} highlight={searchQuery} />
          </Title>
          <Text
            component="span"
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
            <HighlightedText text={note.content} highlight={searchQuery} />
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
