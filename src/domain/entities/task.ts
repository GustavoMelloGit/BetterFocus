import { z } from "zod";
import { Entity } from "./entity";

const TaskPropsSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  completedAt: z.number().nullable(),
});

export type TaskProps = z.infer<typeof TaskPropsSchema>;

export class Task extends Entity<TaskProps> {
  constructor(props: TaskProps) {
    TaskPropsSchema.parse(props);
    super(props);
  }

  public finish(): void {
    this.completed = true;
    this.completedAt = new Date().getTime();
  }

  public reopen(): void {
    this.completed = false;
    this.completedAt = null;
  }

  get id(): string {
    return super.props.id;
  }

  get title(): string {
    return super.props.title;
  }

  private set completedAt(value: number | null) {
    super.props.completedAt = value;
  }

  get completedAt(): number | null {
    return super.props.completedAt;
  }

  private set completed(value: boolean) {
    super.props.completed = value;
  }

  get completed(): boolean {
    return super.props.completed;
  }

  get props(): TaskProps {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      completedAt: this.completedAt,
    };
  }
}
