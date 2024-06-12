import { component$, useStore } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { makeFetchTasksUseCase } from "~/infra/di/make_fetch_tasks_use_case";
import TaskForm from "~/presentation/modules/todo_list/components/TaskForm";
import TaskList from "~/presentation/modules/todo_list/components/TaskList";

const fetchTasksUseCase = makeFetchTasksUseCase();

export const useListLoader = routeLoader$(async () => {
  return fetchTasksUseCase.execute();
});

export default component$(() => {
  const loadedList = useListLoader();
  const list = useStore(loadedList.value);

  return (
    <div class="center flex-1 flex-col text-white">
      <div class="w-full max-w-96 rounded-lg p-4">
        <div class="mb-4">
          <h1 class="inline-block bg-gradient-to-r from-pink-600 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent">
            Todo app
          </h1>
        </div>

        <div class="mb-4">
          <TaskForm />
        </div>

        <section>
          <TaskList list={list} />
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
