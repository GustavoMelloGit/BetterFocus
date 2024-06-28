import type { TaskRepository } from "~/domain/repositories/task";
import type { FinishTaskDto } from "../dtos/finish_task";
import type { Validator } from "../validators/validator";
import type { UseCase } from "./use_case";

export interface IFinishTaskUseCase
  extends UseCase<FinishTaskDto, Promise<void>> {}

export class FinishTaskUseCase implements IFinishTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<FinishTaskDto>,
  ) {}

  public async execute(dto: FinishTaskDto): Promise<void> {
    const safeDto = this.validator.validate(dto);
    const task = await this.taskRepository.taskOfId(safeDto.id);
    task.complete();
    await this.taskRepository.update(safeDto.id, task);
  }
}
