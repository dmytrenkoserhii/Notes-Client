import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Textarea } from '@mantine/core';
import { Note } from '../types/note.interface';

interface ModalEditFormProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedNote: Note) => void;
}

export const ModalNoteForm: React.FC<ModalEditFormProps> = ({
  note,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleSave = () => {
    onSave({ ...note, title, content });
    onClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleSave}
      size="lg"
      title="Edit your note"
    >
      <TextInput
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        mb="md"
        size="xl"
      />
      <Textarea
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
        minRows={5}
        mb="md"
      />
    </Modal>
  );
};
