import { TodoVo } from '../infra/entities/todo_vo';

export interface ITodoService {
  getAllTodos(): Promise<TodoVo[]>;
  getAvailableTodos(): Promise<TodoVo[]>;
  getDeletedTodos(): Promise<TodoVo[]>;
  saveTodo(dto: Pick<TodoVo, 'message' | 'priority'>): Promise<TodoVo>;
  removeTodo(id: string): Promise<void>;
}
