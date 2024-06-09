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

const fetchTasksUseCase = makeFetchTasksUseCase();
const addTaskUseCase = makeAddTaskUseCase();
const deleteTaskUseCase = makeDeleteTaskUseCase();

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

export default component$(() => {
  const list = useListLoader();
  const addTaskAction = useAddTaskAction();
  const deleteTaskAction = useDeleteTaskAction();

  return (
    <div class='m-10'>
      <div>
        <h1>
          <span>TODO</span> List
        </h1>
      </div>

      <div>
        <Form action={addTaskAction} spaReset>
          <input type='text' name='title' required class='border-2 my-4' />{' '}
          <button type='submit' class='button-dark'>
            Add item
          </button>
        </Form>
      </div>

      <div>
        {list.value.length === 0 ? (
          <span>No items found</span>
        ) : (
          <ul class='space-y-2'>
            {list.value.map((item) => (
              <li key={item.id} class='flex gap-5'>
                <button
                  onClick$={async () => {
                    await deleteTaskAction.submit({ id: item.id });
                  }}
                  class='bg-red-500 px-2 py-1 rounded-md'
                >
                  Remove
                </button>
                <span>
                  {item.title} -{' '}
                  {item.completed ? 'Completed' : 'Not completed'}
                </span>
              </li>
            ))}
          </ul>
        )}
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
