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
import { userSchema } from '../schemas';
import { z } from 'zod';
import { DatePickerInput } from '@mantine/dates';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UsersService } from '../services';
import React from 'react';
import { UpdateAccountRequestData } from '../types';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';

type UserFormValues = z.infer<typeof userSchema>;

export const UserForm: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => UsersService.getCurrentUser(),
    retry: false,
  });

  const form = useForm<UserFormValues>({
    initialValues: {
      username: '',
      phone: '',
      birthDate: new Date(),
    },
    validate: zodResolver(userSchema),
  });

  const { mutate: updateAccount } = useMutation({
    mutationFn: (updatedAccount: UpdateAccountRequestData) =>
      UsersService.updateAccount(updatedAccount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      notifications.show({
        title: 'Account Updated',
        message: 'The account has been successfully updated.',
        color: 'cyan',
      });
    },
  });

  React.useEffect(() => {
    if (userData) {
      form.setValues({
        username: userData.account.username || '',
        phone: userData.account.phone || '',
        birthDate: userData.account.birthDate
          ? dayjs(userData.account.birthDate).toDate()
          : new Date(),
      });
    }
  }, [userData]);

  const handleSubmit = (values: UserFormValues) => {
    const updatedValues = {
      ...values,
      birthDate: values.birthDate.toISOString(),
    };
    updateAccount(updatedValues);
  };

  if (isLoading) {
    return (
      <Center h="50vh">
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
