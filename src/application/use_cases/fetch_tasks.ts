import { z } from 'zod';
import type { TaskRepository } from '~/domain/repositories/task';

const FetchTasksDto = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

type FetchTasksDto = z.infer<typeof FetchTasksDto>;

export interface IFetchTasksUseCase {
  execute(): Promise<FetchTasksDto[]>;
}

export class FetchTasksUseCase implements IFetchTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(): Promise<FetchTasksDto[]> {
    const tasks = await this.taskRepository.getAll();
    return tasks.map((task) => FetchTasksDto.parse(task.props));
  }
}
