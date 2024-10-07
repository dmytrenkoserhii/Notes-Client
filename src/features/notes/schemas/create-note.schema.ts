import { z } from 'zod';

export const CreateNoteSchema = z.object({
  title: z.string().trim().max(100, 'Title must be 100 characters or less'),
  content: z
    .string()
    .trim()
    .max(1000, 'Content must be 1000 characters or less'),
});
