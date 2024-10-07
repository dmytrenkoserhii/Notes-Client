import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SignUpFormSchema } from '../schemas';
import { useForm, zodResolver } from '@mantine/form';
import { FcGoogle } from 'react-icons/fc';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Stack,
  Anchor,
  Paper,
  Title,
  Divider,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { SignUpRequestData } from '../types';
import { AuthService } from '../services';

type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<SignUpFormData>({
    validate: zodResolver(SignUpFormSchema),
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  });

  const { mutate: signUp } = useMutation({
    mutationFn: (signUpData: SignUpRequestData) =>
      AuthService.signUpUser(signUpData),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: Error) => {
      console.log(`Error: ${error}`);
    },
  });

  const handleSubmit = (values: SignUpFormData) => {
    const signUpData = {
      email: values.email,
      password: values.password,
      username: values.username,
    };
    signUp(signUpData);
  };

  return (
    <Paper
      shadow="md"
      radius="md"
      p="xl"
      withBorder
      maw={450}
      miw={400}
      mih={600}
      mx="auto"
    >
      <Title order={2} ta="center" mb="lg">
        Create an account
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            required
            label="Username"
            placeholder="Your username"
            size="md"
            {...form.getInputProps('username')}
          />

          <TextInput
            required
            label="Email address"
            placeholder="hello@example.com"
            size="md"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            size="md"
            {...form.getInputProps('password')}
          />

          <PasswordInput
            required
            label="Confirm password"
            placeholder="Confirm your password"
            size="md"
            {...form.getInputProps('passwordConfirmation')}
          />

          <Checkbox
            label="I accept the Terms and Privacy Policy"
            {...form.getInputProps('terms', { type: 'checkbox' })}
          />

          <Button type="submit" fullWidth size="md" mt="xl">
            Register
          </Button>
        </Stack>
      </form>

      <Divider label="Or continue with" labelPosition="center" my="lg" />

      <Button variant="outline" fullWidth size="md">
        <FcGoogle size={20} style={{ marginRight: '10px' }} />
        Google
      </Button>

      <Group justify="apart" mt="xl">
        <Anchor component={Link} to="/auth/login" size="sm">
          Already have an account? Log in
        </Anchor>
        <Anchor component="button" size="sm">
          Need help?
        </Anchor>
      </Group>
    </Paper>
  );
};
