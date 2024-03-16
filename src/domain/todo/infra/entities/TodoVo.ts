import { z } from 'zod';
import { TodoPriority } from './TodoEntity';

export const TodoVoSchema = z.object({
  id: z.string(),
  message: z.string(),
  completed: z.boolean(),
  priority: z.nativeEnum(TodoPriority),
  completedAt: z.number().nullable(),
  createdAt: z.number(),
  updatedAt: z.number().nullable(),
  deletedAt: z.number().nullable(),
});

export type TodoVo = z.infer<typeof TodoVoSchema>;
