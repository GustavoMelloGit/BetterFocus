import { Todo, TodoId } from '../types/Todo';

export type SaveTodoDto = {
  message: string;
};

export interface ITodoService {
  saveTodo(data: SaveTodoDto): Todo;
  removeTodo(todoId: TodoId): void;
  updateTodoMessage(todoId: TodoId, message: string): void;
  toggleTodoStatus(todoId: TodoId): void;
  getAvailableTodos(): Todo[];
  getDeletedTodos(): Todo[];
}
