import type { TaskRepository } from '~/domain/repositories/task';
import type { ReopenTaskDto } from '../dtos/reopen_task';
import type { Validator } from '../validators/validator';

export interface IReopenTaskUseCase {
  execute(dto: ReopenTaskDto): Promise<void>;
}

export class ReopenTaskUseCase implements IReopenTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<ReopenTaskDto>
  ) {}

  public async execute(dto: ReopenTaskDto): Promise<void> {
    const safeDto = this.validator.validate(dto);
    this.taskRepository.update(safeDto.id, { completed: false });
  }
}
