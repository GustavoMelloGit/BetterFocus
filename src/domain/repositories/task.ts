import type { Task } from "../entities/task";

export interface TaskRepository {
  nextIdentity(): string;
  getAll(): Promise<Task[]>;
  taskOfId(id: string): Promise<Task>;
  save(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  update(id: string, task: Task): Promise<void>;
}
