import React from 'react';
import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Button,
  Stack,
  Box,
} from '@mantine/core';
import { FaFolder, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="center" mb="xl">
        Welcome to Your Notes App
      </Title>
      <Text ta="center" size="lg" mb="xl">
        Organize your thoughts and ideas with ease. Choose where you want to go:
      </Text>

      <Grid>
        <Grid.Col span={6}>
          <Card shadow="sm" p="lg" radius="md" withBorder h="100%">
            <Stack h="100%" justify="space-between">
              <Box>
                <Card.Section>
                  <FaFolder
                    size={50}
                    color="blue"
                    style={{ margin: '1rem auto', display: 'block' }}
                  />
                </Card.Section>
                <Title order={3} ta="center" mb="md">
                  Folders
                </Title>
                <Text ta="center" mb="md">
                  Organize your notes into folders for easy access and
                  management.
                </Text>
              </Box>
              <Button
                component={Link}
                to="/folders"
                fullWidth
                variant="light"
                color="blue"
              >
                Go to Folders
              </Button>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow="sm" p="lg" radius="md" withBorder h="100%">
            <Stack h="100%" justify="space-between">
              <Box>
                <Card.Section>
                  <FaFileAlt
                    size={50}
                    color="green"
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
                variant="light"
                color="green"
              >
                Go to Notes
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
