import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Task } from '~/domain/entities/task';
import type { TaskRepository } from '~/domain/repositories/task';
import type { SaveTask, UpdateTask } from '~/domain/repositories/task.types';
import { db } from '../init';

export class TaskFirebaseRepository implements TaskRepository {
  private readonly collectionName = 'tasks';
  private readonly database = db;

  async getAll(): Promise<Task[]> {
    const tasksCol = collection(this.database, this.collectionName);
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

  async getById(id: string): Promise<Task | null> {
    const docRef = doc(this.database, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const task = new Task({
        completed: data.completed,
        title: data.title,
        id: data.id,
      });
      return task;
    }
    throw new Error('Document not found');
  }

  async save(task: SaveTask): Promise<void> {
    const createdTask = new Task({
      completed: false,
      title: task.title,
    });
    const taskRef = doc(
      this.database,
      this.collectionName,
      createdTask.props.id
    );
    await setDoc(taskRef, {
      id: createdTask.props.id,
      title: createdTask.props.title,
      completed: createdTask.props.completed,
    });
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.database, this.collectionName, id));
  }

  async update(id: string, task: UpdateTask): Promise<void> {
    await updateDoc(doc(this.database, this.collectionName, id), task);
  }
}
