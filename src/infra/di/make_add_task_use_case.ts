import type { IAddTaskUseCase } from '~/application/use_cases/add_task';
import { AddTaskUseCase } from '~/application/use_cases/add_task';
import { AddTaskValidator } from '~/application/validators/add_task';
import { TaskFirebaseRepository } from '../persistence/firebase/repositories/task_firebase_repository';

export function makeAddTaskUseCase(): IAddTaskUseCase {
  const taskRepository = new TaskFirebaseRepository();
  const validator = new AddTaskValidator();
  return new AddTaskUseCase(taskRepository, validator);
}
