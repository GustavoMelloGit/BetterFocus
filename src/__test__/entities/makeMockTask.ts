import { faker } from "@faker-js/faker";
import type { TaskProps } from "~/domain/entities/task";
import { Task } from "~/domain/entities/task";

export function makeMockTask(props?: Partial<TaskProps>): Task {
  const completed = props?.completed ?? faker.datatype.boolean();
  const task = new Task({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(5),
    completed,
    completedAt: completed ? faker.date.recent().getTime() : null,
    ...props,
  });
  return task;
}
