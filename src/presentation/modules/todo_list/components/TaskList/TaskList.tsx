import { component$ } from "@builder.io/qwik";
import { globalAction$, z, zod$ } from "@builder.io/qwik-city";
import { format } from "date-fns";
import type { FetchTasksDto } from "~/application/dtos/fetch_tasks";
import {
  deleteTaskUseCase,
  finishTaskUseCase,
  reopenTaskUseCase,
} from "~/infra/di/use_cases/TaskUseCaseFactory";
import TrashCan from "~/presentation/components/icons/TrashCan";
import Checkbox from "~/presentation/components/inputs/Checkbox";

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
    } catch (e: any) {
      return {
        success: false,
        error: e.message as string,
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

  if (!list.length)
    return <span data-testid="no-items-found">No items found</span>;

  return (
    <ul class="space-y-3" data-testid="task-list">
      {list.map((item, index) => {
        const checkId = `check-${item.id}`;
        return (
          <li
            key={item.id}
            class="flex items-center gap-3 text-white/85"
            data-testid="task-item"
          >
            <Checkbox
              checked={item.completed}
              id={checkId}
              name={checkId}
              data-testid={item.completed ? "reopen-task" : "finish-task"}
              onChange$={async (_e, element) => {
                const isChecked = element.checked;
                item.completed = isChecked;
                console.log(isChecked);

                if (isChecked) {
                  item.completedAt = new Date().getTime();
                  await finishTaskAction.submit({
                    id: item.id,
                  });
                } else {
                  item.completedAt = null;
                  await reopenTaskAction.submit({
                    id: item.id,
                  });
                }
              }}
            />
            <span class="flex-1">{item.title}</span>
            <div class="flex items-center gap-1">
              {item.completedAt && (
                <span data-testid="completed-at">
                  {format(item.completedAt, "hh:mm b")}
                </span>
              )}
              <button
                onClick$={async () => {
                  list.splice(index, 1);
                  await deleteTaskAction.submit({
                    id: item.id,
                  });
                }}
                class="text-xl text-red-500"
                data-testid="delete-task"
              >
                <TrashCan />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
});
