import { todoEntityToVo } from '../infra/entities/todo_entity';
import { TodoVo } from '../infra/entities/todo_vo';
import { TodoRepository } from '../infra/repositories/todo_repository/todo_repository';
import { ITodoRepository } from '../infra/repositories/todo_repository/todo_repository.type';
import { ITodoService } from './ITodoService';

export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async getAvailableTodos(): Promise<TodoVo[]> {
    throw new Error('Method not implemented.');
  }

  async getDeletedTodos(): Promise<TodoVo[]> {
    throw new Error('Method not implemented.');
  }

  async saveTodo(dto: Pick<TodoVo, 'priority' | 'message'>): Promise<TodoVo> {
    const todo = await this.todoRepository.create(dto);
    return todoEntityToVo(todo);
  }

  async removeTodo(id: string): Promise<void> {
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
