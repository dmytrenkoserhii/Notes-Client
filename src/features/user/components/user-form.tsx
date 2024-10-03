import {
  Button,
  Container,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { userSchema } from '../schemas/user.schema';
import { z } from 'zod';
import { DUMMY_USER } from '../../../DUMMY_DATA';
import { DatePickerInput } from '@mantine/dates';

type UserFormValues = z.infer<typeof userSchema>;

export const UserForm = () => {
  const form = useForm<UserFormValues>({
    initialValues: {
      email: DUMMY_USER.email,
      username: DUMMY_USER.username || '',
      phone: DUMMY_USER.phone || '',
      birthDate: DUMMY_USER.birthDate || new Date(),
    },
    validate: zodResolver(userSchema),
  });

  const handleSubmit = (values: UserFormValues) => {
    console.log('Updated values:', values);
  };

  return (
    <Container size="sm">
      <Title order={2} mb="lg">
        User Profile
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
      </form>
    </Container>
  );
};
