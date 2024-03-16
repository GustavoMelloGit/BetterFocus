import { v4 } from 'uuid';
import { ITodoEntity, createTodoEntity } from '../../entities/TodoEntity';
import { TodoVo } from '../../entities/TodoVo';
import {
  CreateTodoDto,
  CreateTodoDtoSchema,
  ITodoRepository,
  UpdateTodoDto,
  UpdateTodoDtoSchema,
} from './ITodoRepository';

export class TodoRepository implements ITodoRepository {
  async create(todo: CreateTodoDto): Promise<ITodoEntity> {
    const parsedTodo = CreateTodoDtoSchema.parse(todo);

    const todoInstance = createTodoEntity({
      id: v4(),
      message: parsedTodo.message,
      priority: parsedTodo.priority,
      completed: false,
      createdAt: Date.now(),
      updatedAt: null,
      completedAt: null,
      deletedAt: null,
    });

    const todos = await this.findAll();
    todos.push(todoInstance);

    localStorage.setItem('b_f_todos', JSON.stringify(todos));
    return todoInstance;
  }

  async update(id: string, todo: UpdateTodoDto): Promise<ITodoEntity> {
    const parsedTodo = UpdateTodoDtoSchema.parse(todo);
    const todoToUpdate = await this.findById(id);
    if (!todoToUpdate) throw new Error('Todo not found');

    const updatedTodo = createTodoEntity({
      ...todoToUpdate,
      ...parsedTodo,
      updatedAt: Date.now(),
    });

    const todos = await this.findAll();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    todos[todoIndex] = updatedTodo;

    localStorage.setItem('b_f_todos', JSON.stringify(todos));

    return todoToUpdate;
  }

  async delete(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<ITodoEntity> {
    const todos = await this.findAll();
    if (!todos) throw new Error('Todo not found');
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) throw new Error('Todo not found');

    return todo;
  }

  async findAll(): Promise<ITodoEntity[]> {
    const todos = localStorage.getItem('b_f_todos');
    if (!todos) return [];

    const parsedTodos = JSON.parse(todos) as TodoVo[];
    return parsedTodos.map((todo) => {
      return createTodoEntity(todo);
    });
  }
}

// updateTodoMessage(todoId: string, message: string): void {
//   const todos = this.getAvailableTodos();
//   const todo = todos.find((todo) => todo.id === todoId);
//   if (!todo) return;

//   todo.message = message;
//   todo.updatedAt = Date.now();
//   localStorage.setItem('b_f_todos', JSON.stringify(todos));

//   TodoEvent.emit('todoUpdated', todo);
// }

// saveTodo(data: SaveTodoDto): Todo {
//   const todos = this.getAvailableTodos();
//   const todo: Todo = {
//     id: this.IdGenerator(),
//     message: data.message,
//     completed: false,
//     createdAt: Date.now(),
//     completedAt: null,
//     updatedAt: null,
//     deletedAt: null,
//   };

//   todos.push(todo);
//   localStorage.setItem('b_f_todos', JSON.stringify(todos));

//   TodoEvent.emit('todoAdded', todo);

//   return todo;
// }

// removeTodo(todoId: string): void {
//   const todos = this.getAvailableTodos();
//   const todo = todos.find((todo) => todo.id === todoId);
//   if (!todo) return;

//   todo.deletedAt = Date.now();
//   localStorage.setItem('b_f_todos', JSON.stringify(todos));

//   TodoEvent.emit('todoRemoved', todo);
// }

// toggleTodoStatus(todoId: string): void {
//   const todos = this.getAvailableTodos();
//   const todo = todos.find((todo) => todo.id === todoId);
//   if (!todo) return;

//   todo.completed = !todo.completed;
//   todo.completedAt = todo.completed ? Date.now() : null;
//   todo.updatedAt = Date.now();
//   localStorage.setItem('b_f_todos', JSON.stringify(todos));

//   const eventToEmit = todo.completed ? 'todoChecked' : 'todoUnchecked';
//   TodoEvent.emit(eventToEmit, todo);
// }

// getAvailableTodos(): Todo[] {
//   const todos = localStorage.getItem('b_f_todos');
//   if (todos) {
//     const parsedTodos = JSON.parse(todos);
//     return parsedTodos.filter((todo: Todo) => !todo.deletedAt);
//   }
//   return [];
// }

// getDeletedTodos(): Todo[] {
//   const todos = localStorage.getItem('b_f_todos');
//   if (todos) {
//     const parsedTodos = JSON.parse(todos);
//     return parsedTodos.filter((todo: Todo) => todo.deletedAt);
//   }
//   return [];
// }
