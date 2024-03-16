import { todoEntityToVo } from '../infra/entities/TodoEntity';
import { TodoVo } from '../infra/entities/TodoVo';
import { ITodoRepository } from '../infra/repositories/todo/ITodoRepository';
import { TodoRepository } from '../infra/repositories/todo/TodoRepository';
import { ITodoService } from './ITodoService';

export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async completeTodo(id: string): Promise<TodoVo> {
    const todo = await this.todoRepository.update(id, { completed: true });
    return todoEntityToVo(todo);
  }

  async saveTodo(dto: Pick<TodoVo, 'priority' | 'message'>): Promise<TodoVo> {
    const todo = await this.todoRepository.create(dto);
    return todoEntityToVo(todo);
  }

  async removeTodo(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getAllTodos(): Promise<TodoVo[]> {
    const todos = await this.todoRepository.findAll();
    return todos.map(todoEntityToVo);
  }
}

export function makeTodoService(): ITodoService {
  return new TodoService(new TodoRepository());
}
