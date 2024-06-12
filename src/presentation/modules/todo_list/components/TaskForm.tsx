import { component$ } from "@builder.io/qwik";
import { Form, globalAction$, z, zod$ } from "@builder.io/qwik-city";
import { makeAddTaskUseCase } from "~/infra/di/make_add_task_use_case";

const addTaskUseCase = makeAddTaskUseCase();

export const useAddTaskAction = globalAction$(
  async (item) => {
    try {
      await addTaskUseCase.execute(item);
      return {
        success: true,
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

export default component$(() => {
  const addTaskAction = useAddTaskAction();

  return (
    <Form
      action={addTaskAction}
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
