import type { IAddTaskUseCase } from "~/application/use_cases/add_task";
import { AddTaskUseCase } from "~/application/use_cases/add_task";
import type { IDeleteTaskUseCase } from "~/application/use_cases/delete_task";
import { DeleteTaskUseCase } from "~/application/use_cases/delete_task";
import type { IFetchTasksUseCase } from "~/application/use_cases/fetch_tasks";
import { FetchTasksUseCase } from "~/application/use_cases/fetch_tasks";
import type { IFinishTaskUseCase } from "~/application/use_cases/finish_task";
import { FinishTaskUseCase } from "~/application/use_cases/finish_task";
import type { IReopenTaskUseCase } from "~/application/use_cases/reopen_task";
import { ReopenTaskUseCase } from "~/application/use_cases/reopen_task";
import { AddTaskValidator } from "~/application/validators/add_task";
import { DeleteTaskValidator } from "~/application/validators/delete_task";
import { FetchTasksValidator } from "~/application/validators/fetch_tasks";
import { FinishTaskValidator } from "~/application/validators/finish_task";
import { ReopenTaskValidator } from "~/application/validators/reopen_task";
import { TaskFirebaseRepository } from "../../persistence/firebase/repositories/task_firebase_repository";

export class TaskUseCaseFactory {
  private readonly taskRepository = new TaskFirebaseRepository();

  makeDeleteTaskUseCase(): IDeleteTaskUseCase {
    const validator = new DeleteTaskValidator();
    return new DeleteTaskUseCase(this.taskRepository, validator);
  }

  makeAddTaskUseCase(): IAddTaskUseCase {
    const validator = new AddTaskValidator();
    return new AddTaskUseCase(this.taskRepository, validator);
  }

  makeFetchTasksUseCase(): IFetchTasksUseCase {
    const validator = new FetchTasksValidator();
    return new FetchTasksUseCase(this.taskRepository, validator);
  }

  makeReopenTaskUseCase(): IReopenTaskUseCase {
    const validator = new ReopenTaskValidator();
    return new ReopenTaskUseCase(this.taskRepository, validator);
  }
  makeFinishTaskUseCase(): IFinishTaskUseCase {
    const validator = new FinishTaskValidator();
    return new FinishTaskUseCase(this.taskRepository, validator);
  }
}

const taskUseCaseFactory = new TaskUseCaseFactory();
export const deleteTaskUseCase = taskUseCaseFactory.makeDeleteTaskUseCase();
export const addTaskUseCase = taskUseCaseFactory.makeAddTaskUseCase();
export const fetchTasksUseCase = taskUseCaseFactory.makeFetchTasksUseCase();
export const reopenTaskUseCase = taskUseCaseFactory.makeReopenTaskUseCase();
export const finishTaskUseCase = taskUseCaseFactory.makeFinishTaskUseCase();
