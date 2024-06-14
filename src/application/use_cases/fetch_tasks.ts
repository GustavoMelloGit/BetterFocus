import type { TaskRepository } from "~/domain/repositories/task";
import type { FetchTasksDto } from "../dtos/fetch_tasks";
import type { Validator } from "../validators/validator";
import type { UseCase } from "./use_case";

export interface IFetchTasksUseCase
  extends UseCase<void, Promise<FetchTasksDto>> {}

export class FetchTasksUseCase implements IFetchTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<FetchTasksDto>,
  ) {}

  public async execute(): Promise<FetchTasksDto> {
    const tasks = await this.taskRepository.getAll();
    const dto: FetchTasksDto = tasks.map((t) => ({
      id: t.id,
      title: t.title,
      completed: t.completed,
      completedAt: t.completedAt,
    }));
    return this.validator.validate(dto);
  }
}
