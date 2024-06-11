import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './init';

type ObjectLike = Record<string, unknown>;

export class FirebaseRepository {
  private readonly collectionName: string;
  private readonly database = db;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  private getRef(id: string) {
    return doc(this.database, this.collectionName, id);
  }

  async createDoc<T extends ObjectLike>(id: string, data: T): Promise<void> {
    const taskRef = this.getRef(id);
    await setDoc(taskRef, data);
  }

  async findAllDocs<T extends ObjectLike>(): Promise<T[]> {
    const tasksCol = collection(this.database, this.collectionName);
    const taskSnapshot = await getDocs(tasksCol);
    const dataList = taskSnapshot.docs.map((doc) => doc.data());
    return dataList as T[];
  }

  async findOneDoc<T extends ObjectLike>(id: string): Promise<T> {
    const docRef = this.getRef(id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error('Document not found');

    const data = docSnap.data();
    return data as T;
  }

  async updateDoc<T extends ObjectLike>(id: string, data: T): Promise<void> {
    const docRef = this.getRef(id);
    await updateDoc(docRef, data);
  }

  async deleteDoc(id: string): Promise<void> {
    const docRef = this.getRef(id);
    await deleteDoc(docRef);
  }
}
