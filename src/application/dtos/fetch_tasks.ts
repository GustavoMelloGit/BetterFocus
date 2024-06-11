import { z } from 'zod';

export const FetchTasksDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export type FetchTasksDto = z.infer<typeof FetchTasksDtoSchema>;
