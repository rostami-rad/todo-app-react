import { z } from 'zod';

export const todoFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters') // TODO: make this configurable
    .trim(),
});

export type TodoFormSchema = z.infer<typeof todoFormSchema>;
