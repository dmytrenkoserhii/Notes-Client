import { z } from 'zod';

export const EditNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
});
