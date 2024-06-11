import { z } from 'zod';

export const AddTaskDtoSchema = z.object({
  title: z.string(),
});
export type AddTaskDto = z.infer<typeof AddTaskDtoSchema>;
