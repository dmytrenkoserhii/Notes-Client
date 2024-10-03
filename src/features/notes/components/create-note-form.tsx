import { Box, Card, Center, Textarea, TextInput } from '@mantine/core';
import React from 'react';
import { useClickOutside } from '@mantine/hooks';

export const CreateNoteForm: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  const ref = useClickOutside(() => {
    if (isExpanded) {
      handleCreateNote();
    }
  });

  const handleCreateNote = () => {
    if (title.trim() || content.trim()) {
      console.log('Creating note:', { title, content });
    }
    setIsExpanded(false);
    setTitle('');
    setContent('');
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
          <Box>
            <TextInput
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              mb="sm"
            />
            <Textarea
              placeholder="Take a note..."
              autosize
              minRows={2}
              maxRows={6}
              value={content}
              onChange={(event) => setContent(event.currentTarget.value)}
            />
          </Box>
        ) : (
          <Box>Take a note...</Box>
        )}
      </Card>
    </Center>
  );
};
