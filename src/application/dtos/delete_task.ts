import { z } from 'zod';

export const DeleteTaskDtoSchema = z.object({
  id: z.string(),
});
export type DeleteTaskDto = z.infer<typeof DeleteTaskDtoSchema>;
