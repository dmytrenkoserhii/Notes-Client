import React from 'react';
import { Text, Card, Stack, Title } from '@mantine/core';
import { Note } from '../types/note.interface';
import { ModalNoteForm } from './modal-note-form';

interface NoteItemProps {
  note: Note;
  onUpdate: (updatedNote: Note) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onUpdate }) => {
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
              // WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              flex: 1,
            }}
          >
            {note.content}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa
            nostrum officiis, corporis iure, voluptatibus nesciunt maxime dicta
            dolorem aut dolor, nobis molestiae placeat consequuntur facere!
            Exercitationem eaque ratione repellat voluptatibus? Lorem, ipsum
            dolor sit amet consectetur adipisicing elit. Magnam libero ipsa
            mollitia dolorem, nam ipsum dolorum, asperiores repudiandae
            quibusdam aliquam eos quam? Ex mollitia rem praesentium a explicabo,
            tenetur possimus.
          </Text>
        </Stack>
      </Card>
      <ModalNoteForm
        note={note}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={onUpdate}
      />
    </>
  );
};
