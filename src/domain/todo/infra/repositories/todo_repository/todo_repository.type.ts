import { ITodoEntity } from '../../entities/todo_entity';
import { TodoPriority } from '../../entities/todo_vo';

export interface ITodoRepository {
  create: (todo: CreateTodoDto) => Promise<ITodoEntity>;
  update: (id: string, todo: UpdateTodoDto) => Promise<ITodoEntity>;
  delete: (id: string) => Promise<void>;
  findById: (id: string) => Promise<ITodoEntity>;
  findAll: () => Promise<ITodoEntity[]>;
}

export type CreateTodoDto = {
  message: string;
  priority: TodoPriority;
};

export type UpdateTodoDto = {
  message: string;
  priority: TodoPriority;
};
