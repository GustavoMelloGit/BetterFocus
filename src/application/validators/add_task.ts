import { AddTaskDtoSchema, type AddTaskDto } from '../dtos/add_task';
import type { Validator } from './validator';

export class AddTaskValidator implements Validator<AddTaskDto> {
  validate(data: AddTaskDto) {
    return AddTaskDtoSchema.parse(data);
  }
}
