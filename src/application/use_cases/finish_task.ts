import { z } from 'zod';
import type { TaskRepository } from '~/domain/repositories/task';

const FinishTaskDtoSchema = z.object({
  id: z.string(),
});
type FinishTaskDto = z.infer<typeof FinishTaskDtoSchema>;

export interface IFinishTaskUseCase {
  execute(dto: FinishTaskDto): Promise<void>;
}

export class FinishTaskUseCase implements IFinishTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: FinishTaskDto): Promise<void> {
    const safeDto = FinishTaskDtoSchema.parse(dto);
    this.taskRepository.update(safeDto.id, { completed: true });
  }
}
