import { TodoPriority } from '../../domain/todo/infra/entities/TodoEntity';
import { TodoVo } from '../../domain/todo/infra/entities/TodoVo';

export function makeFakeTodoVo(properties?: Partial<TodoVo>): TodoVo {
  return {
    id: '1',
    message: 'Todo 1',
    priority: TodoPriority.LOW,
    completed: false,
    completedAt: null,
    createdAt: Date.now(),
    updatedAt: null,
    deletedAt: null,
    ...properties,
  };
}
