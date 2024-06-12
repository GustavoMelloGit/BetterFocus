import { component$, useStore } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { makeAddTaskUseCase } from "~/infra/di/make_add_task_use_case";
import { makeDeleteTaskUseCase } from "~/infra/di/make_delete_task_use_case";
import { makeFetchTasksUseCase } from "~/infra/di/make_fetch_tasks_use_case";
import { makeFinishTaskUseCase } from "~/infra/di/make_finish_task_use_case";
import { makeReopenTaskUseCase } from "~/infra/di/make_reopen_task_use_case";
import TrashCan from "~/presentation/components/icons/TrashCan";
import Checkbox from "~/presentation/components/inputs/Checkbox";

const fetchTasksUseCase = makeFetchTasksUseCase();
const addTaskUseCase = makeAddTaskUseCase();
const deleteTaskUseCase = makeDeleteTaskUseCase();
const finishTaskUseCase = makeFinishTaskUseCase();
const reopenTaskUseCase = makeReopenTaskUseCase();

export const useListLoader = routeLoader$(async () => {
  return fetchTasksUseCase.execute();
});

export const useAddTaskAction = routeAction$(
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

export const useDeleteTaskAction = routeAction$(
  async (item) => {
    try {
      await deleteTaskUseCase.execute(item);
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
    id: z.string().trim().min(1),
  }),
);

export const useFinishTaskAction = routeAction$(
  async (item) => {
    try {
      await finishTaskUseCase.execute(item);
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
    id: z.string().trim().min(1),
  }),
);

export const useReopenTaskAction = routeAction$(
  async (item) => {
    try {
      await reopenTaskUseCase.execute(item);
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
    id: z.string().trim().min(1),
  }),
);

export default component$(() => {
  const loadedList = useListLoader();
  const list = useStore(loadedList.value);
  const addTaskAction = useAddTaskAction();
  const deleteTaskAction = useDeleteTaskAction();
  const finishTaskAction = useFinishTaskAction();
  const reopenTaskAction = useReopenTaskAction();

  return (
    <div class="center flex-1 flex-col text-white">
      <div class="w-full max-w-96 rounded-lg p-4">
        <div class="mb-4">
          <h1 class="inline-block bg-gradient-to-r from-pink-600 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent">
            Todo app
          </h1>
        </div>

        <div class="mb-4">
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
            <button
              type="submit"
              class="rounded-md bg-gray-950 px-5 py-3 text-white"
            >
              Add
            </button>
          </Form>
        </div>

        <section>
          {list.length === 0 ? (
            <span>No items found</span>
          ) : (
            <ul class="space-y-3">
              {list.map((item, index) => (
                <li key={item.id} class="flex items-center gap-3 text-white/90">
                  <Checkbox
                    checked={item.completed}
                    name={`check-${item.id}`}
                    onChange$={async (_e, element) => {
                      const isChecked = element.checked;
                      const currentItem = list.find((i) => i.id === item.id);
                      if (!currentItem) return;

                      currentItem.completed = isChecked;
                      if (isChecked) {
                        await finishTaskAction.submit({
                          id: item.id,
                        });
                      } else {
                        await reopenTaskAction.submit({
                          id: item.id,
                        });
                      }
                    }}
                  />
                  <span class="flex-1">{item.title}</span>
                  <button
                    onClick$={async () => {
                      list.splice(index, 1);
                      await deleteTaskAction.submit({
                        id: item.id,
                      });
                    }}
                    class="text-xl text-red-500"
                  >
                    <TrashCan />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "BetterFocus",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
