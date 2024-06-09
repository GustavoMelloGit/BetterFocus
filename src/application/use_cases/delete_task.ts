import { z } from 'zod';
import type { TaskRepository } from '~/domain/repositories/task';

const DeleteTaskDtoSchema = z.object({
  id: z.string(),
});
type DeleteTaskDto = z.infer<typeof DeleteTaskDtoSchema>;

export interface IDeleteTaskUseCase {
  execute(dto: DeleteTaskDto): Promise<void>;
}

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: DeleteTaskDto): Promise<void> {
    const safeDto = DeleteTaskDtoSchema.parse(dto);
    this.taskRepository.delete(safeDto.id);
  }
}
