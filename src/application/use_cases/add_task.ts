import { Task } from "~/domain/entities/task";
import type { TaskRepository } from "~/domain/repositories/task";
import type { AddTaskDto } from "../dtos/add_task";
import type { Validator } from "../validators/validator";

export interface IAddTaskUseCase {
  execute(dto: AddTaskDto): Promise<void>;
}

export class AddTaskUseCase implements IAddTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly validator: Validator<AddTaskDto>,
  ) {}

  public async execute(dto: AddTaskDto): Promise<void> {
    const safeDto = this.validator.validate(dto);
    const task = new Task({
      completed: false,
      id: this.taskRepository.nextIdentity(),
      title: safeDto.title,
    });
    await this.taskRepository.save(task);
  }
}
