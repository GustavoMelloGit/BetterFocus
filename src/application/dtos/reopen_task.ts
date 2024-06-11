import { z } from 'zod';

export const ReopenTaskDtoSchema = z.object({
  id: z.string(),
});
export type ReopenTaskDto = z.infer<typeof ReopenTaskDtoSchema>;
