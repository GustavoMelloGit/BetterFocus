import { component$, useStore } from "@builder.io/qwik";
import { useListLoader } from "~/routes";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";

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
          <TaskForm currentList={list} />
        </div>

        <section>
          <TaskList list={list} />
        </section>
      </div>
    </div>
  );
});
