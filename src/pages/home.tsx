import React from 'react';
import {
  Container,
  Title,
  Text,
  Card,
  Button,
  Stack,
  Box,
  Center,
  Loader,
} from '@mantine/core';
import { FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { UsersService } from '../features/user';

const Home: React.FC = () => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  const renderButtonContent = () => {
    if (isLoading) {
      return <Loader color='white' size='sm' />;
    }
    if (userData) {
      return 'Go to Notes';
    }
    return 'Log in';
  };

  const buttonLink = userData ? '/notes' : '/sign-in';

  return (
    <Center h='100vh'>
      <Container size='lg' py='xl'>
        <Title order={1} ta='center' mb='xl'>
          Welcome to Your Notes App
        </Title>
        <Text ta='center' size='lg' mb='xl'>
          Organize your thoughts and ideas with ease.
        </Text>

        <Card shadow='sm' p='lg' radius='md' withBorder maw={400} mx='auto'>
          <Stack h='100%' justify='space-between'>
            <Box>
              <Card.Section>
                <FaFileAlt
                  size={50}
                  color='cyan'
                  style={{ margin: '1rem auto', display: 'block' }}
                />
              </Card.Section>
              <Title order={3} ta='center' mb='md'>
                Notes
              </Title>
              <Text ta='center' mb='md'>
                View and manage all your notes in one place.
              </Text>
            </Box>
            <Button
              component={Link}
              to={buttonLink}
              fullWidth
              variant='gradient'
              gradient={{ from: 'cyan', to: 'teal', deg: 105 }}
            >
              {renderButtonContent()}
            </Button>
          </Stack>
        </Card>
      </Container>
    </Center>
  );
};

export default Home;
