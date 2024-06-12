import { faker } from "@faker-js/faker";
import type { Task } from "~/domain/entities/task";

export function makeMockTask(props?: Partial<Task>): Task {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(5),
    completed: faker.datatype.boolean(),
    ...props,
  };
}
