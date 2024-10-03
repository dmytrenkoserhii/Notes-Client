import { Center, Container, Flex } from '@mantine/core';
import React from 'react';
import { Navbar } from '../../../components';
import { Outlet } from 'react-router';

export const NotesLayout: React.FC = () => {
  return (
    <Center>
      <Container w="80rem" m={0} maw="80rem">
        <Flex justify="space-between">
          <Navbar />
          <Flex direction="column" flex="1" p="md">
            <Outlet />
          </Flex>
        </Flex>
      </Container>
    </Center>
  );
};
