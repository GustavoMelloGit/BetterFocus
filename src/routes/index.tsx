import { component$ } from '@builder.io/qwik';
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { makeAddTaskUseCase } from '~/infra/di/make_add_task_use_case';
import { makeDeleteTaskUseCase } from '~/infra/di/make_delete_task_use_case';
import { makeFetchTasksUseCase } from '~/infra/di/make_fetch_tasks_use_case';
import { makeFinishTaskUseCase } from '~/infra/di/make_finish_task_use_case';
import { makeReopenTaskUseCase } from '~/infra/di/make_reopen_task_use_case';

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
  })
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
  })
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
  })
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
  })
);

export default component$(() => {
  const list = useListLoader();
  const addTaskAction = useAddTaskAction();
  const deleteTaskAction = useDeleteTaskAction();
  const finishTaskAction = useFinishTaskAction();
  const reopenTaskAction = useReopenTaskAction();

  return (
    <div class='flex-1 center flex-col'>
      <div class='w-fit shadow-xl p-4 rounded-lg'>
        <div class='mb-6 text-center'>
          <h1>
            <span>TODO</span> List
          </h1>
        </div>

        <div class='mb-4'>
          <Form
            action={addTaskAction}
            spaReset
            class='flex gap-2 items-stretch'
          >
            <input
              type='text'
              name='title'
              class='border-2 flex-1 p-1 rounded-md'
            />
            <button
              type='submit'
              class='bg-slate-500 rounded-md px-2 py-1 text-white'
            >
              Add item
            </button>
          </Form>
        </div>

        <section>
          {list.value.length === 0 ? (
            <span>No items found</span>
          ) : (
            <ul class='space-y-2'>
              {list.value.map((item) => (
                <li key={item.id} class='flex items-center gap-3'>
                  <button
                    onClick$={async () => {
                      const { value } = await deleteTaskAction.submit({
                        id: item.id,
                      });
                      if (value.success) {
                        list.value.filter((i) => i.id !== item.id);
                      }
                    }}
                    class='bg-red-500 p-1 rounded-md text-white'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1em'
                      height='1em'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fill='currentColor'
                        d='M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z'
                      />
                    </svg>
                  </button>
                  <input
                    type='checkbox'
                    checked={item.completed}
                    name='complete-task'
                    onChange$={async (_e, element) => {
                      const isChecked = element.checked;

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
                  <span>
                    {item.title} -{' '}
                    {item.completed ? 'Completed' : 'Not completed'}
                  </span>
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
  title: 'BetterFocus',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
