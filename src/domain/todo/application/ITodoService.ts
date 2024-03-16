import { TodoVo } from '../infra/entities/TodoVo';

export interface ITodoService {
  getAllTodos(): Promise<TodoVo[]>;
  saveTodo(dto: Pick<TodoVo, 'message' | 'priority'>): Promise<TodoVo>;
  removeTodo(id: string): Promise<void>;
  completeTodo(id: string): Promise<TodoVo>;
}
