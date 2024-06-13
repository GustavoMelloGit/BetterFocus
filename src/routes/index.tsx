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

export const head: DocumentHead = {
  title: "BetterFocus",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
