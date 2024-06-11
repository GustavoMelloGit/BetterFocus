import { z } from 'zod';
import type { Task } from '../entities/task';

export const SaveTaskSchema = z.object({
  title: z.string(),
});

export type SaveTask = z.infer<typeof SaveTaskSchema>;

export type UpdateTask = Partial<Omit<Task, 'id'>>;
