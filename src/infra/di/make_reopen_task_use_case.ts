import {
  ReopenTaskUseCase,
  type IReopenTaskUseCase,
} from '~/application/use_cases/reopen_task';
import { ReopenTaskValidator } from '~/application/validators/reopen_task';
import { TaskFirebaseRepository } from '../persistence/firebase/repositories/task_firebase_repository';

export function makeReopenTaskUseCase(): IReopenTaskUseCase {
  const taskRepository = new TaskFirebaseRepository();
  const validator = new ReopenTaskValidator();
  return new ReopenTaskUseCase(taskRepository, validator);
}
