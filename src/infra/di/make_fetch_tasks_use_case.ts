import type { IFetchTasksUseCase } from '~/application/use_cases/fetch_tasks';
import { FetchTasksUseCase } from '~/application/use_cases/fetch_tasks';
import { TaskFirebaseRepository } from '../persistence/firebase/repositories/task_firebase_repository';

export function makeFetchTasksUseCase(): IFetchTasksUseCase {
  const taskRepository = new TaskFirebaseRepository();

  return new FetchTasksUseCase(taskRepository);
}
