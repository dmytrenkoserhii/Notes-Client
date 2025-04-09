import { Box, Button, Center, Title } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <Center h='100vh'>
      <Box>
        <Title order={1}>Page not found!</Title>
        <Button component={Link} to='/' fullWidth variant='light' color='cyan'>
          Home Page
        </Button>
      </Box>
    </Center>
  );
};
