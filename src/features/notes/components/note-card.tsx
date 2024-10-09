import { ActionIcon, Card, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import { Note } from '../types/note.interface';
import { ModalNoteForm } from './modal-note-form';
import { NoteViewContext } from '../../../contexts';
import { HighlightedText } from './highlighted-text';
import { MdDelete, MdRestore } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NotesService } from '../services';
import { EditNoteRequestData } from '../types';
import { notifications } from '@mantine/notifications';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { searchQuery } = React.useContext(NoteViewContext);
  const queryClient = useQueryClient();

  const { mutate: deleteNote } = useMutation({
    mutationFn: () => NotesService.deleteNote(note.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      notifications.show({
        title: 'Note Deleted',
        message: 'The note has been permanently deleted.',
        color: 'red',
      });
    },
  });

  const { mutate: restoreNote } = useMutation({
    mutationFn: (updatedNote: EditNoteRequestData) =>
      NotesService.editNote(note.id, updatedNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      notifications.show({
        title: 'Note Restored',
        message: 'The note has been restored from trash.',
        color: 'cyan',
      });
    },
  });

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteNote();
  };

  const handleRestore = () => {
    restoreNote({ isDeleted: false });
  };

  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        withBorder
        w={250}
        h={110}
        onClick={handleCardClick}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        {note.isDeleted && (
          <>
            <ActionIcon
              color="cyan"
              variant="filled"
              radius="xl"
              size="sm"
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRestore();
              }}
            >
              <MdRestore size="1rem" />
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="filled"
              radius="xl"
              size="sm"
              style={{
                position: 'absolute',
                top: '8px',
                right: '40px',
                zIndex: 1,
              }}
              onClick={handleDelete}
            >
              <MdDelete size="1rem" />
            </ActionIcon>
          </>
        )}
        <Stack gap="xs" style={{ flex: 1 }}>
          <Title
            order={5}
            lineClamp={1}
            style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            <HighlightedText text={note.title} highlight={searchQuery} />
          </Title>
          <Text
            component="div"
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
      {!note.isDeleted && (
        <ModalNoteForm
          note={note}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
