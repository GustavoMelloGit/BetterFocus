import { v4 } from 'uuid';
import { TodoEvent } from '../event/TodoEvent';
import { Todo, TodoId } from '../types/Todo';
import { ITodoService, SaveTodoDto } from './ITodoService';

export class TodoService implements ITodoService {
  constructor(private readonly IdGenerator: () => TodoId) {}

  updateTodoMessage(todoId: string, message: string): void {
    const todos = this.getAvailableTodos();
    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) return;

    todo.message = message;
    todo.updatedAt = Date.now();
    localStorage.setItem('b_f_todos', JSON.stringify(todos));

    TodoEvent.emit('todoUpdated', todo);
  }

  saveTodo(data: SaveTodoDto): Todo {
    const todos = this.getAvailableTodos();
    const todo: Todo = {
      id: this.IdGenerator(),
      message: data.message,
      completed: false,
      createdAt: Date.now(),
      completedAt: null,
      updatedAt: null,
      deletedAt: null,
    };

    todos.push(todo);
    localStorage.setItem('b_f_todos', JSON.stringify(todos));

    TodoEvent.emit('todoAdded', todo);

    return todo;
  }

  removeTodo(todoId: string): void {
    const todos = this.getAvailableTodos();
    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) return;

    todo.deletedAt = Date.now();
    localStorage.setItem('b_f_todos', JSON.stringify(todos));

    TodoEvent.emit('todoRemoved', todo);
  }

  toggleTodoStatus(todoId: string): void {
    const todos = this.getAvailableTodos();
    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) return;

    todo.completed = !todo.completed;
    todo.completedAt = todo.completed ? Date.now() : null;
    todo.updatedAt = Date.now();
    localStorage.setItem('b_f_todos', JSON.stringify(todos));

    const eventToEmit = todo.completed ? 'todoChecked' : 'todoUnchecked';
    TodoEvent.emit(eventToEmit, todo);
  }

  getAvailableTodos(): Todo[] {
    const todos = localStorage.getItem('b_f_todos');
    if (todos) {
      const parsedTodos = JSON.parse(todos);
      return parsedTodos.filter((todo: Todo) => !todo.deletedAt);
    }
    return [];
  }

  getDeletedTodos(): Todo[] {
    const todos = localStorage.getItem('b_f_todos');
    if (todos) {
      const parsedTodos = JSON.parse(todos);
      return parsedTodos.filter((todo: Todo) => todo.deletedAt);
    }
    return [];
  }
}

const generateId = (): TodoId => {
  return v4();
};

export function makeTodoService(): ITodoService {
  return new TodoService(generateId);
}
