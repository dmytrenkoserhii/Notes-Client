import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { NoteViewContextProvider } from '../contexts';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * (60 * 1000),
      gcTime: 10 * (60 * 1000),
    },
  },
});

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

export const AppProviders: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NoteViewContextProvider>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Notifications position="top-right" />
          <RouterProvider router={router} />
        </MantineProvider>
      </NoteViewContextProvider>
    </QueryClientProvider>
  );
};
