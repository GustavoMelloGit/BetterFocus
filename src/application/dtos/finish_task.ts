import { z } from 'zod';

export const FinishTaskDtoSchema = z.object({
  id: z.string(),
});
export type FinishTaskDto = z.infer<typeof FinishTaskDtoSchema>;
