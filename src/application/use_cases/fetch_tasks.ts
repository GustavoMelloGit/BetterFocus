import type { TaskRepository } from '~/domain/repositories/task';
import type { FetchTasksDto } from '../dtos/fetch_tasks';
import type { Validator } from '../validators/validator';

export interface IFetchTasksUseCase {
  execute(): Promise<FetchTasksDto>;
}

export class FetchTasksUseCase implements IFetchTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<FetchTasksDto>
  ) {}

  public async execute(): Promise<FetchTasksDto> {
    const tasks = await this.taskRepository.getAll();
    return this.validator.validate(tasks);
  }
}
