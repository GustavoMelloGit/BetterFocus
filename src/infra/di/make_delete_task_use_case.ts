import type { IDeleteTaskUseCase } from '~/application/use_cases/delete_task';
import { DeleteTaskUseCase } from '~/application/use_cases/delete_task';
import { TaskFirebaseRepository } from '../persistence/firebase/repositories/task_firebase_repository';

export function makeDeleteTaskUseCase(): IDeleteTaskUseCase {
  const taskRepository = new TaskFirebaseRepository();
  return new DeleteTaskUseCase(taskRepository);
}
