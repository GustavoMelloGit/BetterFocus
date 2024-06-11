import type { ReopenTaskDto } from '../dtos/reopen_task';
import { ReopenTaskDtoSchema } from '../dtos/reopen_task';
import type { Validator } from './validator';

export class ReopenTaskValidator implements Validator<ReopenTaskDto> {
  validate(data: ReopenTaskDto) {
    return ReopenTaskDtoSchema.parse(data);
  }
}
