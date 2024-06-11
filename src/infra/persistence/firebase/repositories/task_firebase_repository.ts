import { randomBytes } from 'crypto';
import type { Task } from '~/domain/entities/task';
import type { TaskRepository } from '~/domain/repositories/task';
import type { SaveTask, UpdateTask } from '~/domain/repositories/task.types';
import { FirebaseRepository } from '../firebase_repository';

export class TaskFirebaseRepository
  extends FirebaseRepository
  implements TaskRepository
{
  constructor() {
    super('tasks');
  }

  async getAll(): Promise<Task[]> {
    const tasks = await super.findAllDocs<Task>();
    return tasks;
  }

  async getById(id: string): Promise<Task | null> {
    const task = await super.findOneDoc<Task>(id);
    return task;
  }

  async save(task: SaveTask): Promise<void> {
    const id = randomBytes(16).toString('hex');
    const taskToCreate: Task = {
      ...task,
      id,
      completed: false,
    };
    return super.createDoc(id, taskToCreate);
  }

  async delete(id: string): Promise<void> {
    return super.deleteDoc(id);
  }

  async update(id: string, task: UpdateTask): Promise<void> {
    return super.updateDoc(id, task);
  }
}
