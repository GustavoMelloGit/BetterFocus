import { Task } from "~/domain/entities/task";
import type { TaskRepository } from "~/domain/repositories/task";
import type { AddTaskDto } from "../dtos/add_task";
import type { Validator } from "../validators/validator";
import type { UseCase } from "./use_case";

export interface IAddTaskUseCase
  extends UseCase<AddTaskDto, Promise<AddTaskDto>> {}

export class AddTaskUseCase implements IAddTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<AddTaskDto>,
  ) {}

  public async execute(dto: AddTaskDto): Promise<AddTaskDto> {
    const safeDto = this.validator.validate(dto);
    const task = new Task({
      completed: false,
      id: this.taskRepository.nextIdentity(),
      title: safeDto.title,
      completedAt: null,
    });
    await this.taskRepository.save(task);

    return task.props;
  }
}
