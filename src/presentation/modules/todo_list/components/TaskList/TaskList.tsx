import { component$ } from "@builder.io/qwik";
import { globalAction$, z, zod$ } from "@builder.io/qwik-city";
import type { FetchTasksDto } from "~/application/dtos/fetch_tasks";
import { makeDeleteTaskUseCase } from "~/infra/di/make_delete_task_use_case";
import { makeFinishTaskUseCase } from "~/infra/di/make_finish_task_use_case";
import { makeReopenTaskUseCase } from "~/infra/di/make_reopen_task_use_case";
import TrashCan from "~/presentation/components/icons/TrashCan";
import Checkbox from "~/presentation/components/inputs/Checkbox";

const deleteTaskUseCase = makeDeleteTaskUseCase();
const finishTaskUseCase = makeFinishTaskUseCase();
const reopenTaskUseCase = makeReopenTaskUseCase();

export const useDeleteTaskAction = globalAction$(
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

export const useFinishTaskAction = globalAction$(
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

export const useReopenTaskAction = globalAction$(
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

export type Props = {
  list: FetchTasksDto;
};
export default component$<Props>(({ list }) => {
  const deleteTaskAction = useDeleteTaskAction();
  const finishTaskAction = useFinishTaskAction();
  const reopenTaskAction = useReopenTaskAction();

  if (!list.length) return <span>No items found</span>;

  return (
    <ul class="space-y-3" data-testid="task-list">
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
  );
});
