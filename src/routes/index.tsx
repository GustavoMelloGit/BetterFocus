import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { makeFetchTasksUseCase } from "~/infra/di/make_fetch_tasks_use_case";
import TodoPage from "~/presentation/modules/todo_list/view/TodoPage";

const fetchTasksUseCase = makeFetchTasksUseCase();

export const useListLoader = routeLoader$(async () => {
  return fetchTasksUseCase.execute();
});

export default component$(() => {
  return <TodoPage />;
});

export const head: DocumentHead = ({ resolveValue }) => {
  const tasks = resolveValue(useListLoader);
  const tasksToComplete = tasks.filter((task) => !task.completed).length;
  let defaultTitle = "BetterFocus";
  if (tasksToComplete > 0) {
    defaultTitle += ` - ${tasksToComplete} Tasks`;
  }
  return {
    title: defaultTitle,
    meta: [
      {
        name: "description",
        content: `BetterFocus - ${tasksToComplete} Tasks`,
      },
    ],
  };
};
