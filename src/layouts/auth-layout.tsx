import React from 'react';
import { Outlet } from 'react-router';
import { Footer, Header } from '../components';
import { Container, Stack } from '@mantine/core';

export const AuthLayout: React.FC = () => {
  return (
    <Stack h='100dvh' w='100%' justify='space-between'>
      <Header />

      <Container component='main' w='100%' maw='100%' px={0} m={0} flex='1'>
        <Outlet />
      </Container>

      <Footer />
    </Stack>
  );
};
