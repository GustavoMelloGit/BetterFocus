import type { TaskRepository } from '~/domain/repositories/task';
import type { FinishTaskDto } from '../dtos/finish_task';
import type { Validator } from '../validators/validator';

export interface IFinishTaskUseCase {
  execute(dto: FinishTaskDto): Promise<void>;
}

export class FinishTaskUseCase implements IFinishTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<FinishTaskDto>
  ) {}

  public async execute(dto: FinishTaskDto): Promise<void> {
    const safeDto = this.validator.validate(dto);
    this.taskRepository.update(safeDto.id, { completed: true });
  }
}
