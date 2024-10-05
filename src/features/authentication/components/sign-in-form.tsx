import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
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
import { FcGoogle } from 'react-icons/fc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '../services';
import { SignInFormSchema } from '../schemas';

type SignInFormData = z.infer<typeof SignInFormSchema>;

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<SignInFormData>({
    validate: zodResolver(SignInFormSchema),
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const { mutate: signIn } = useMutation({
    mutationFn: (signInData: SignInFormData) =>
      AuthService.signInUser(signInData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    },
    onError: (error: Error) => {
      console.log(`Error: ${error}`);
    },
  });

  const handleSubmit = (values: SignInFormData) => {
    signIn(values);
  };

  return (
    <Paper shadow="md" radius="md" p="xl" withBorder w={600}>
      <Title order={2} ta="center" mt="md" mb={50}>
        Welcome back!
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            required
            label="Email / Username"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
          />

          <Group justify="space-between">
            <Checkbox
              label="Remember me"
              {...form.getInputProps('remember', { type: 'checkbox' })}
            />
            <Anchor component="button" type="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Stack>
      </form>

      <Divider label="Or continue with" labelPosition="center" my="lg" />

      <Button variant="outline" fullWidth>
        <FcGoogle size={20} style={{ marginRight: '8px' }} />
        Continue with Google
      </Button>

      <Group justify="center" mt="md">
        <Anchor component="button" type="button" size="sm">
          Don't have an account? Register
        </Anchor>
      </Group>
    </Paper>
  );
};
