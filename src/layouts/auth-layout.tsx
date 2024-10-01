import React from 'react';
import { Outlet } from 'react-router';
import { Footer, Header } from '../components';
import { Box } from '@mantine/core';

export const AuthLayout: React.FC = () => {
  return (
    <Box>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </Box>
  );
};
