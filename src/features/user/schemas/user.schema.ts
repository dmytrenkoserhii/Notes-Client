import { z } from 'zod';

export const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }),
  birthDate: z
    .date()
    .max(new Date(), { message: 'Birth date cannot be in the future' }),
});
