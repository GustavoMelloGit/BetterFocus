import { z } from 'zod';
import type { TaskRepository } from '~/domain/repositories/task';

const AddTaskDtoSchema = z.object({
  title: z.string(),
});
type AddTaskDto = z.infer<typeof AddTaskDtoSchema>;

export interface IAddTaskUseCase {
  execute(dto: AddTaskDto): Promise<void>;
}

export class AddTaskUseCase implements IAddTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async execute(dto: AddTaskDto): Promise<void> {
    const safeDto = AddTaskDtoSchema.parse(dto);
    this.taskRepository.save(safeDto);
  }
}
