import { z } from "zod";
import { ValidationError } from "../errors/ValidationError";

const TaskPropsSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  completedAt: z.number().nullable(),
});

export type TaskProps = z.infer<typeof TaskPropsSchema>;

export class Task {
  #id: string;
  #title!: string;
  #completed!: boolean;
  #completedAt!: number | null;

  constructor(props: TaskProps) {
    this.#id = props.id;
    this.title = props.title;
    this.completed = props.completed;
    this.completedAt = props.completedAt;
  }

  public complete(): void {
    if (this.completed) {
      throw new ValidationError([
        { field: "completed", message: "task already completed" },
      ]);
    }
    this.completed = true;
    this.completedAt = new Date().getTime();
  }

  public reopen(): void {
    if (!this.completed) {
      throw new ValidationError([
        { field: "completed", message: "task already opened" },
      ]);
    }
    this.completed = false;
    this.completedAt = null;
  }

  public get id(): string {
    return this.#id;
  }

  public get title(): string {
    return this.#title;
  }

  private set title(value: string) {
    if (typeof value !== "string") {
      throw new ValidationError([
        { field: "title", message: "title must be a string" },
      ]);
    } else if (value.length < 3) {
      throw new ValidationError([
        { field: "title", message: "title must be at least 3 characters" },
      ]);
    }
    this.#title = value;
  }

  public get completedAt(): number | null {
    return this.#completedAt;
  }

  private set completedAt(value: number | null) {
    if (value !== null && typeof value !== "number") {
      throw new ValidationError([
        { field: "completedAt", message: "completedAt must be number or null" },
      ]);
    }
    this.#completedAt = value;
  }

  public get completed(): boolean {
    return this.#completed;
  }

  private set completed(value: boolean) {
    if (typeof value !== "boolean") {
      throw new ValidationError([
        { field: "completed", message: "completed must be a boolean" },
      ]);
    }
    this.#completed = value;
  }

  public get props(): TaskProps {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      completedAt: this.completedAt,
    };
  }
}
