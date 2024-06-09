import type { IFinishTaskUseCase } from '~/application/use_cases/finish_task';
import { FinishTaskUseCase } from '~/application/use_cases/finish_task';
import { TaskFirebaseRepository } from '../persistence/firebase/repositories/task_firebase_repository';

export function makeFinishTaskUseCase(): IFinishTaskUseCase {
  const taskRepository = new TaskFirebaseRepository();
  return new FinishTaskUseCase(taskRepository);
}
