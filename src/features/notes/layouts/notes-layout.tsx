import { Center, Container, Flex } from '@mantine/core';
import React from 'react';
import { Navbar } from '../../../components';
import { Outlet } from 'react-router';

export const NotesLayout: React.FC = () => {
  return (
    <Center>
      <Container w="80rem" m={0} maw="80rem">
        <Flex justify="space-between">
          <Container w="12rem" p={0}>
            <Navbar />
          </Container>
          <Flex direction="column" flex="1" pl="1rem">
            <Outlet />
          </Flex>
        </Flex>
      </Container>
    </Center>
  );
};
