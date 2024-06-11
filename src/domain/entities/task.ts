import { z } from 'zod';

const TaskPropsSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export type Task = z.infer<typeof TaskPropsSchema>;
