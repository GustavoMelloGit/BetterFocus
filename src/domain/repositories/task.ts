import type { Task } from '../entities/task';
import type { SaveTask, UpdateTask } from './task.types';

export interface TaskRepository {
  getAll(): Promise<Task[]>;
  getById(id: string): Promise<Task | null>;
  save(task: SaveTask): Promise<void>;
  delete(id: string): Promise<void>;
  update(id: string, task: UpdateTask): Promise<void>;
}
