import { z } from 'zod';
import { Entity } from './entity';

const TaskPropsSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  completed: z.boolean(),
});

export type TaskProps = z.infer<typeof TaskPropsSchema>;

export class Task extends Entity<TaskProps> {
  constructor(props: TaskProps) {
    const safeProps = TaskPropsSchema.parse(props);
    super(safeProps);
  }
}
