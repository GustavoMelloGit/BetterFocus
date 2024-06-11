import type { DeleteTaskDto } from '../dtos/delete_task';
import { DeleteTaskDtoSchema } from '../dtos/delete_task';
import type { Validator } from './validator';

export class DeleteTaskValidator implements Validator<DeleteTaskDto> {
  validate(data: DeleteTaskDto) {
    return DeleteTaskDtoSchema.parse(data);
  }
}
