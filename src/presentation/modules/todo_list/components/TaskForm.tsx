import { $, component$ } from "@builder.io/qwik";
import { Form, globalAction$, z, zod$ } from "@builder.io/qwik-city";
import type { FetchTasksDto } from "~/application/dtos/fetch_tasks";
import { makeAddTaskUseCase } from "~/infra/di/make_add_task_use_case";

const addTaskUseCase = makeAddTaskUseCase();

export const useAddTaskAction = globalAction$(
  async (item) => {
    try {
      const task = await addTaskUseCase.execute(item);
      return {
        success: true,
        task,
      };
    } catch {
      return {
        success: false,
      };
    }
  },
  zod$({
    title: z.string().trim().min(1),
  }),
);

type Props = {
  currentList: FetchTasksDto;
};
export default component$<Props>(({ currentList }) => {
  const addTaskAction = useAddTaskAction();

  return (
    <Form
      action={addTaskAction}
      onSubmitCompleted$={$(() => {
        if (!addTaskAction.value?.success) return;
        const taskCreated = addTaskAction.value.task as FetchTasksDto[number];
        currentList.push(taskCreated);
      })}
      spaReset
      class="flex items-stretch gap-2 rounded-md bg-gray-400/20 p-2"
    >
      <input
        type="text"
        name="title"
        class="flex-1 rounded-md bg-transparent p-1 focus:outline-none"
        placeholder="Task name"
      />
      <button type="submit" class="rounded-md bg-gray-950 px-5 py-3 text-white">
        Add
      </button>
    </Form>
  );
});
