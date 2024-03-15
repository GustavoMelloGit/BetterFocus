import { ITodoEntity, createTodoEntity } from '../../entities/todo_entity';
import { TodoVo } from '../../entities/todo_vo';
import {
  CreateTodoDto,
  ITodoRepository,
  UpdateTodoDto,
} from './todo_repository.type';

export class TodoRepository implements ITodoRepository {
  async create(todo: CreateTodoDto): Promise<ITodoEntity> {
    const todoInstance = createTodoEntity({
      message: todo.message,
      priority: todo.priority,
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
  update(id: string, todo: UpdateTodoDto): Promise<ITodoEntity> {
    console.log(id, todo);
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<ITodoEntity> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<ITodoEntity[]> {
    const todos = localStorage.getItem('b_f_todos');
    if (!todos) return Promise.resolve([]);

    const parsedTodos = JSON.parse(todos) as TodoVo[];
    return Promise.resolve(
      parsedTodos.map((todo) => {
        return createTodoEntity(todo);
      })
    );
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
