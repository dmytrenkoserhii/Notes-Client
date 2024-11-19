import { Center } from '@mantine/core';
import React from 'react';
import { SignInForm } from '../components';

export const SignInPage: React.FC = () => {
  return (
    <Center h="100vh">
      <SignInForm />
    </Center>
  );
};
