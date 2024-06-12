import { z } from "zod";
import { Entity } from "./entity";

const TaskPropsSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export type TaskProps = z.infer<typeof TaskPropsSchema>;

export class Task extends Entity<TaskProps> {
  constructor(props: TaskProps) {
    TaskPropsSchema.parse(props);
    super(props);
  }

  public finish(): void {
    this.completed = true;
  }

  public reopen(): void {
    this.completed = false;
  }

  get id(): string {
    return super.props.id;
  }

  get title(): string {
    return super.props.title;
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
    };
  }
}
