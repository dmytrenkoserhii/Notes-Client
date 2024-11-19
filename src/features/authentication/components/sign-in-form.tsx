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
import { Link } from 'react-router-dom';

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
    <Paper
      shadow="md"
      radius="md"
      p="xl"
      withBorder
      maw={450}
      miw={400}
      mih={500}
      mx="auto"
    >
      <Title order={2} ta="center" mb="lg">
        Welcome back!
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            required
            label="Email / Username"
            placeholder="your@email.com"
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

          <Group justify="apart" mt="md">
            <Checkbox
              label="Remember me"
              {...form.getInputProps('remember', { type: 'checkbox' })}
            />
            <Anchor component="button" type="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button type="submit" fullWidth size="md" mt="xl">
            Sign in
          </Button>
        </Stack>
      </form>

      <Divider label="Or continue with" labelPosition="center" my="lg" />

      <Button variant="outline" fullWidth size="md">
        <FcGoogle size={20} style={{ marginRight: '10px' }} />
        Google
      </Button>

      <Group justify="apart" mt="xl">
        <Anchor component={Link} to="/sign-up" size="sm">
          Don't have an account? Register
        </Anchor>
        <Anchor component="button" size="sm">
          Need help?
        </Anchor>
      </Group>
    </Paper>
  );
};
