import type { TaskRepository } from "~/domain/repositories/task";
import type { DeleteTaskDto } from "../dtos/delete_task";
import type { Validator } from "../validators/validator";
import type { UseCase } from "./use_case";

export interface IDeleteTaskUseCase
  extends UseCase<DeleteTaskDto, Promise<void>> {}

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<DeleteTaskDto>,
  ) {}

  public async execute(dto: DeleteTaskDto): Promise<void> {
    const safeDto = this.validator.validate(dto);
    await this.taskRepository.delete(safeDto.id);
  }
}
