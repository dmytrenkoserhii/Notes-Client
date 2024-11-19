import React from 'react';
import { Box, Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import { Note } from '../types/note.interface';
import { z } from 'zod';
import { EditNoteSchema } from '../schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, zodResolver } from '@mantine/form';
import { NotesService } from '../services';
import { MdDelete } from 'react-icons/md';

interface ModalEditFormProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
}

type EditNoteFormData = z.infer<typeof EditNoteSchema>;

export const ModalNoteForm: React.FC<ModalEditFormProps> = ({
  note,
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const form = useForm<EditNoteFormData>({
    validate: zodResolver(EditNoteSchema),
    initialValues: {
      title: note.title,
      content: note.content,
    },
  });

  React.useEffect(() => {
    form.setValues({
      title: note.title,
      content: note.content,
    });
  }, [note]);

  const { mutate: editNote } = useMutation({
    mutationFn: (updatedNote: EditNoteFormData) =>
      NotesService.editNote(note.id, updatedNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const { mutate: deleteNote } = useMutation({
    mutationFn: () => NotesService.deleteNote(note.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleClose = () => {
    editNote(form.values);
    onClose();
  };

  const handleDelete = () => {
    deleteNote();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      size="lg"
      title="Edit your note"
    >
      <Box>
        <TextInput
          label="Title"
          placeholder="Enter note title"
          mb="md"
          size="xl"
          {...form.getInputProps('title')}
        />
        <Textarea
          label="Content"
          placeholder="Enter note content"
          minRows={5}
          mb="md"
          {...form.getInputProps('content')}
        />
        <Group justify="apart" mt="md">
          <Button
            color="red"
            leftSection={<MdDelete size={16} />}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button onClick={handleClose}>Save</Button>
        </Group>
      </Box>
    </Modal>
  );
};
