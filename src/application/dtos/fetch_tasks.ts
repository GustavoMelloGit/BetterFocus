import { z } from "zod";

export const FetchTasksDtoSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    completed: z.boolean(),
    completedAt: z.number().nullable(),
  }),
);
export type FetchTasksDto = z.infer<typeof FetchTasksDtoSchema>;
