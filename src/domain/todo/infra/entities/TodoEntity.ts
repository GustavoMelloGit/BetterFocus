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

  isDeleted(): boolean;
  delete(): void;
}

export class TodoEntity implements ITodoEntity {
  private _id: TodoId;
  private _message: string;
  private _completed: boolean;
  private _priority: TodoPriority;
  private _completedAt: TodoDate | null;
  private _createdAt: TodoDate;
  private _updatedAt: TodoDate | null;
  private _deletedAt: TodoDate | null;

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
    this._id = id;
    this._message = message;
    this._completed = completed;
    this._priority = priority;
    this._completedAt = completedAt;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._deletedAt = deletedAt;
  }
  set message(message: string) {
    this._message = message;
    this._updatedAt = Date.now();
  }

  get message(): string {
    return this._message;
  }

  set priority(priority: TodoPriority) {
    this._priority = priority;
    this._updatedAt = Date.now();
  }

  get priority(): TodoPriority {
    return this._priority;
  }

  set completed(completed: boolean) {
    this._completed = completed;
    this._completedAt = completed ? Date.now() : null;
    this._updatedAt = Date.now();
  }

  get completed(): boolean {
    return this._completed;
  }

  get id(): TodoId {
    return this._id;
  }

  get completedAt(): TodoDate | null {
    return this._completedAt;
  }

  get createdAt(): TodoDate {
    return this._createdAt;
  }

  get updatedAt(): TodoDate | null {
    return this._updatedAt;
  }

  get deletedAt(): TodoDate | null {
    return this._deletedAt;
  }

  isDeleted(): boolean {
    return !!this._deletedAt;
  }

  delete(): void {
    this._deletedAt = Date.now();
  }
}

export function createTodoEntity(todo: TodoVo) {
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
    priority: todo.priority,
    completed: todo.completed,
    completedAt: todo.completedAt,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
    deletedAt: todo.deletedAt,
  };
}
