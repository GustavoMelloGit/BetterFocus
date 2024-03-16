import { TodoService } from '../../domain/todo/application/TodoService';

export const spySaveTodo = vi.spyOn(TodoService.prototype, 'saveTodo');
export const spyGetAllTodos = vi.spyOn(TodoService.prototype, 'getAllTodos');
export const spyRemoveTodo = vi.spyOn(TodoService.prototype, 'removeTodo');
export const spyCompleteTodo = vi.spyOn(TodoService.prototype, 'completeTodo');
