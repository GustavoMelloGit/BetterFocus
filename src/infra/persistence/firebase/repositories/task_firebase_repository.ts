import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { Task } from '~/domain/entities/task';
import type { TaskRepository } from '~/domain/repositories/task';
import type { SaveTask, UpdateTask } from '~/domain/repositories/task.types';
import { db } from '../init';

export class TaskFirebaseRepository implements TaskRepository {
  async getAll(): Promise<Task[]> {
    const tasksCol = collection(db, 'tasks');
    const taskSnapshot = await getDocs(tasksCol);
    const taskList = taskSnapshot.docs.map((doc) => doc.data());
    const tasks: Task[] = taskList.map((task) => {
      return new Task({
        id: task.id,
        title: task.title,
        completed: task.completed,
      });
    });
    return tasks;
  }

  getById(id: string): Promise<Task | null> {
    throw new Error('Method not implemented.');
  }

  async save(task: SaveTask): Promise<void> {
    const createdTask = new Task({
      completed: false,
      title: task.title,
    });
    const taskRef = doc(db, 'tasks', createdTask.props.id);
    await setDoc(taskRef, {
      id: createdTask.props.id,
      title: createdTask.props.title,
      completed: createdTask.props.completed,
    });
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, 'tasks', id));
  }

  update(id: string, task: UpdateTask): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
