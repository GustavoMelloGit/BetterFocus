import type { FinishTaskDto } from '../dtos/finish_task';
import { FinishTaskDtoSchema } from '../dtos/finish_task';
import type { Validator } from './validator';

export class FinishTaskValidator implements Validator<FinishTaskDto> {
  validate(data: FinishTaskDto) {
    return FinishTaskDtoSchema.parse(data);
  }
}
