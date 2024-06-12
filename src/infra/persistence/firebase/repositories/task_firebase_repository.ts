import { randomBytes } from "crypto";
import { Task, type TaskProps } from "~/domain/entities/task";
import type { TaskRepository } from "~/domain/repositories/task";
import { FirebaseRepository } from "../firebase_repository";

export class TaskFirebaseRepository
  extends FirebaseRepository
  implements TaskRepository
{
  constructor() {
    super("tasks");
  }
  nextIdentity(): string {
    return randomBytes(16).toString("hex");
  }

  async getAll(): Promise<Task[]> {
    const tasksProps = await super.findAllDocs<TaskProps>();
    const tasks = tasksProps.map((taskProps) => new Task(taskProps));
    return tasks;
  }

  async taskOfId(id: string): Promise<Task> {
    const taskProps = await super.findOneDoc<TaskProps>(id);
    const task = new Task(taskProps);
    return task;
  }

  async save(task: Task): Promise<void> {
    return super.createDoc(task.id, task.props);
  }

  async delete(id: string): Promise<void> {
    return super.deleteDoc(id);
  }

  async update(id: string, task: Task): Promise<void> {
    return super.updateDoc(id, task.props);
  }
}
