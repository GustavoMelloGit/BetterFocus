import type { FetchTasksDto } from '../dtos/fetch_tasks';
import { FetchTasksDtoSchema } from '../dtos/fetch_tasks';
import type { Validator } from './validator';

export class FetchTasksValidator implements Validator<FetchTasksDto> {
  validate(data: FetchTasksDto) {
    return FetchTasksDtoSchema.parse(data);
  }
}
