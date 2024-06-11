import { z } from 'zod';

export const FetchTasksDtoSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    completed: z.boolean(),
  })
);
export type FetchTasksDto = z.infer<typeof FetchTasksDtoSchema>;
