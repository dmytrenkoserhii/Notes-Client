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
    <Stack gap="md" style={{ maxWidth: 400 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="sm">
          <TextInput
            required
            label="Username"
            placeholder="Your username"
            {...form.getInputProps('username')}
          />

          <TextInput
            required
            label="Email address"
            placeholder="hello@example.com"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
          />

          <PasswordInput
            required
            label="Confirm password"
            placeholder="Confirm your password"
            {...form.getInputProps('passwordConfirmation')}
          />

          <Checkbox
            label="I accept the Terms and Privacy Policy"
            {...form.getInputProps('terms', { type: 'checkbox' })}
          />

          <Button type="submit" fullWidth>
            Register
          </Button>

          <Button variant="outline" fullWidth>
            <FcGoogle size={20} style={{ marginRight: '10px' }} />
            Continue with Google
          </Button>
        </Stack>
      </form>

      <Group justify="center" gap="xs">
        <Anchor component={Link} to="/auth/login" size="sm">
          Already have an account? Log in
        </Anchor>
      </Group>

      <Group justify="center">
        <Anchor component="button" size="sm">
          Didn't receive confirmation instructions?
        </Anchor>
      </Group>
    </Stack>
  );
};
