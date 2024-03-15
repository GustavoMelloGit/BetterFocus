import { TodoPriority } from './todo_entity';

export type TodoVo = {
  id: string;
  message: string;
  completed: boolean;
  priority: TodoPriority;
  completedAt: number | null;
  createdAt: number;
  updatedAt: number | null;
  deletedAt: number | null;
};
