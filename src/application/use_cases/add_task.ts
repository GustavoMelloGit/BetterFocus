import type { TaskRepository } from '~/domain/repositories/task';
import type { AddTaskDto } from '../dtos/add_task';
import type { Validator } from '../validators/validator';

export interface IAddTaskUseCase {
  execute(dto: AddTaskDto): Promise<void>;
}

export class AddTaskUseCase implements IAddTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<AddTaskDto>
  ) {}

  public async execute(dto: AddTaskDto): Promise<void> {
    const safeDto = this.validator.validate(dto);
    this.taskRepository.save(safeDto);
  }
}
