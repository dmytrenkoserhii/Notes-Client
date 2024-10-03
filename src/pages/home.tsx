import React from 'react';
import {
  Container,
  Title,
  Text,
  Card,
  Button,
  Stack,
  Box,
} from '@mantine/core';
import { FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="center" mb="xl">
        Welcome to Your Notes App
      </Title>
      <Text ta="center" size="lg" mb="xl">
        Organize your thoughts and ideas with ease.
      </Text>

      <Card shadow="sm" p="lg" radius="md" withBorder maw={400} mx="auto">
        <Stack h="100%" justify="space-between">
          <Box>
            <Card.Section>
              <FaFileAlt
                size={50}
                color="cyan"
                style={{ margin: '1rem auto', display: 'block' }}
              />
            </Card.Section>
            <Title order={3} ta="center" mb="md">
              Notes
            </Title>
            <Text ta="center" mb="md">
              View and manage all your notes in one place.
            </Text>
          </Box>
          <Button
            component={Link}
            to="/notes"
            fullWidth
            variant="gradient"
            gradient={{ from: 'cyan', to: 'teal', deg: 105 }}
          >
            Go to Notes
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default Home;
