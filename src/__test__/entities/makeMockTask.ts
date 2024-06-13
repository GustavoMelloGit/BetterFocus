import { faker } from "@faker-js/faker";
import type { TaskProps } from "~/domain/entities/task";

export function makeMockTask(props?: Partial<TaskProps>): TaskProps {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(5),
    completed: faker.datatype.boolean(),
    completedAt: faker.date.recent().getTime(),
    ...props,
  };
}
