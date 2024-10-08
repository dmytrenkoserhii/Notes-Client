import {
  Button,
  Center,
  Container,
  Fieldset,
  Group,
  Loader,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { userSchema } from '../schemas/user.schema';
import { z } from 'zod';
import { DatePickerInput } from '@mantine/dates';
import { useQuery } from '@tanstack/react-query';
import { UsersService } from '../services';
import React from 'react';

type UserFormValues = z.infer<typeof userSchema>;

export const UserForm: React.FC = () => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  const form = useForm<UserFormValues>({
    initialValues: {
      email: '',
      username: '',
      phone: '',
      birthDate: new Date(),
    },
    validate: zodResolver(userSchema),
  });

  React.useEffect(() => {
    if (userData) {
      form.setValues({
        email: userData.email || '',
        username: userData.account.username || '',
        phone: userData.phone || '',
        birthDate: userData.birthDate || new Date(),
      });
    }
  }, [userData]);

  const handleSubmit = (values: UserFormValues) => {
    console.log('Updated values:', values);
  };

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Container size="sm">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Fieldset legend="Personal information">
          <Stack gap="md">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />

            <TextInput
              label="Username"
              placeholder="johndoe"
              {...form.getInputProps('username')}
            />

            <TextInput
              label="Phone"
              placeholder="+1234567890"
              {...form.getInputProps('phone')}
            />

            <DatePickerInput
              label="Birth Date"
              placeholder="Pick a date"
              {...form.getInputProps('birthDate')}
            />

            <Group justify="flex-end" mt="xl">
              <Button type="submit" size="md">
                Save Changes
              </Button>
            </Group>
          </Stack>
        </Fieldset>
      </form>
    </Container>
  );
};
