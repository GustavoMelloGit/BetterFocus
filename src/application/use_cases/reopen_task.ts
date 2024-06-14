import type { TaskRepository } from "~/domain/repositories/task";
import type { ReopenTaskDto } from "../dtos/reopen_task";
import type { Validator } from "../validators/validator";
import type { UseCase } from "./use_case";

export interface IReopenTaskUseCase
  extends UseCase<ReopenTaskDto, Promise<void>> {}

export class ReopenTaskUseCase implements IReopenTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<ReopenTaskDto>,
  ) {}

  public async execute(dto: ReopenTaskDto): Promise<void> {
    const safeDto = this.validator.validate(dto);
    const task = await this.taskRepository.taskOfId(safeDto.id);
    task.reopen();
    await this.taskRepository.update(safeDto.id, task);
  }
}
