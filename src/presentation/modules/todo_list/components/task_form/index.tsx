import { $, component$ } from "@builder.io/qwik";
import { Form, globalAction$, z, zod$ } from "@builder.io/qwik-city";
import type { FetchTasksDto } from "~/application/dtos/fetch_tasks";
import { addTaskUseCase } from "~/infra/di/use_cases/task_use_case_factory";
import { Button } from "~/presentation/components/buttons/button";

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

export type Props = {
  currentList: FetchTasksDto;
};
export const TaskForm = component$<Props>(({ currentList }) => {
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
      data-testid="task-form"
    >
      <input
        type="text"
        name="title"
        class="flex-1 rounded-md bg-transparent p-1 focus:outline-none"
        placeholder="Task name"
        data-testid="task-name-input"
      />
      <Button
        type="submit"
        data-testid="add-task-button"
        isLoading={addTaskAction.isRunning}
      >
        Add
      </Button>
    </Form>
  );
});
