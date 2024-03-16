import { z } from 'zod';
import { ITodoEntity, TodoPriority } from '../../entities/TodoEntity';

export interface ITodoRepository {
  create: (todo: CreateTodoDto) => Promise<ITodoEntity>;
  update: (id: string, todo: UpdateTodoDto) => Promise<ITodoEntity>;
  delete: (id: string) => Promise<void>;
  findById: (id: string) => Promise<ITodoEntity>;
  findAll: () => Promise<ITodoEntity[]>;
}

export const CreateTodoDtoSchema = z.object({
  message: z.string(),
  priority: z.nativeEnum(TodoPriority),
});

export type CreateTodoDto = z.infer<typeof CreateTodoDtoSchema>;

export const UpdateTodoDtoSchema = z.object({
  message: z.string().optional(),
  priority: z.nativeEnum(TodoPriority).optional(),
  completed: z.boolean().optional(),
});
export type UpdateTodoDto = z.infer<typeof UpdateTodoDtoSchema>;
