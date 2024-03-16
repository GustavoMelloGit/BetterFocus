import { TodoVo } from './TodoVo';

export type TodoId = string;
export type TodoDate = number;
export enum TodoPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4,
  URGENT = 5,
}

export interface ITodoEntity {
  id: TodoId;
  message: string;
  completed: boolean;
  priority: TodoPriority;
  completedAt: TodoDate | null;
  createdAt: TodoDate;
  updatedAt: TodoDate | null;
  deletedAt: TodoDate | null;
  isCompleted(): boolean;
  isDeleted(): boolean;
}

export class TodoEntity implements ITodoEntity {
  id: TodoId;
  message: string;
  completed: boolean;
  priority: TodoPriority;
  completedAt: TodoDate | null;
  createdAt: TodoDate;
  updatedAt: TodoDate | null;
  deletedAt: TodoDate | null;

  constructor(
    id: TodoId,
    message: string,
    completed: boolean,
    priority: TodoPriority,
    completedAt: TodoDate | null = null,
    createdAt: TodoDate = Date.now(),
    updatedAt: TodoDate | null = null,
    deletedAt: TodoDate | null = null
  ) {
    this.id = id;
    this.message = message;
    this.completed = completed;
    this.priority = priority;
    this.completedAt = completedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  isCompleted(): boolean {
    return this.completed;
  }

  isDeleted(): boolean {
    return this.deletedAt !== null;
  }
}

export function createTodoEntity(todo: TodoVo): ITodoEntity {
  return new TodoEntity(
    todo.id,
    todo.message,
    todo.completed,
    todo.priority,
    todo.completedAt,
    todo.createdAt,
    todo.updatedAt,
    todo.deletedAt
  );
}

export function todoEntityToVo(todo: ITodoEntity): TodoVo {
  return {
    id: todo.id,
    message: todo.message,
    completed: todo.completed,
    priority: todo.priority,
    completedAt: todo.completedAt,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    deletedAt: todo.deletedAt,
  };
}
