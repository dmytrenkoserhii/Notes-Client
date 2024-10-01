import React from 'react';
import { Outlet } from 'react-router';
import { Footer, Header } from '../components';
import { Container, Stack } from '@mantine/core';

export const AuthLayout: React.FC = () => {
  return (
    <Stack h="100vh" justify="space-between">
      <Header />

      <Container component="main">
        <Outlet />
      </Container>

      <Footer />
    </Stack>
  );
};
