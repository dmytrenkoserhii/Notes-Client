import { Box, Card, Center, Textarea, TextInput } from '@mantine/core';
import React from 'react';
import { useClickOutside } from '@mantine/hooks';
import { CreateNoteSchema } from '../schemas';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NotesService } from '../services';
import { z } from 'zod';
import { UsersService } from '../../user';

export type CreateNoteFormData = z.infer<typeof CreateNoteSchema>;

export const CreateNoteForm: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  const form = useForm<CreateNoteFormData>({
    validate: zodResolver(CreateNoteSchema),
    initialValues: {
      title: '',
      content: '',
    },
  });

  const { mutate: createNote } = useMutation({
    mutationFn: (createNoteData: CreateNoteFormData) =>
      NotesService.createNote(createNoteData),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: Error) => {
      console.log(`Error: ${error}`);
    },
  });

  const ref = useClickOutside(() => {
    if (isExpanded) {
      form.onSubmit(handleSubmit)();
    }
  });

  const handleSubmit = (data: CreateNoteFormData) => {
    if (data.title.trim() || data.content.trim()) {
      const requestData = {
        ...data,
        userId: userData.id,
      };

      createNote(requestData);
    }
    setIsExpanded(false);
  };

  return (
    <Center>
      <Card
        ref={ref}
        shadow="xs"
        p="xs"
        withBorder
        onClick={() => !isExpanded && setIsExpanded(true)}
        miw={400}
      >
        {isExpanded ? (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Box>
              <TextInput
                placeholder="Title"
                mb="sm"
                {...form.getInputProps('title')}
                autoFocus
              />
              <Textarea
                placeholder="Take a note..."
                autosize
                minRows={2}
                maxRows={6}
                {...form.getInputProps('content')}
              />
            </Box>
          </form>
        ) : (
          <Box>Take a note...</Box>
        )}
      </Card>
    </Center>
  );
};
