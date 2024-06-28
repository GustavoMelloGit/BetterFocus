import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { fetchTasksUseCase } from "~/infra/di/use_cases/task_use_case_factory";
import { TodoPage } from "~/presentation/modules/todo_list/view/todo_page";

export const useListLoader = routeLoader$(async () => {
  return fetchTasksUseCase.execute();
});

export default component$(() => {
  return <TodoPage />;
});

export const head: DocumentHead = ({ resolveValue }) => {
  const tasks = resolveValue(useListLoader);
  const tasksToComplete = tasks.filter((task) => !task.completed).length;
  let title = "BetterFocus";

  if (tasksToComplete > 0) {
    title += ` - ${tasksToComplete} Tasks pending`;
  }

  const seoTitle =
    "BetterFocus - Your Ultimate To-Do App for Enhanced Productivity";
  const seoDescription =
    "BetterFocus: Enhance your productivity with our intuitive to-do app. Organize tasks, set priorities, and stay focused effortlessly. Achieve more with BetterFocus today!";

  return {
    title: title,
    meta: [
      {
        name: "title",
        content: seoTitle,
      },
      {
        name: "description",
        content: seoDescription,
      },
      {
        name: "keywords",
        content:
          "to-do app, productivity app, task manager, task organizer, BetterFocus, productivity tools",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://www.betterfocus.com/",
      },
      {
        property: "og:title",
        content: seoTitle,
      },
      {
        property: "og:description",
        content: seoDescription,
      },
      {
        property: "og:image",
        content: "https://www.betterfocus.com/images/og-image.jpg",
      },
      {
        property: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "twitter:url",
        content: "https://www.betterfocus.com/",
      },
      {
        property: "twitter:title",
        content: seoTitle,
      },
      {
        property: "twitter:description",
        content: seoDescription,
      },
      {
        property: "twitter:image",
        content: "https://www.betterfocus.com/images/twitter-image.jpg",
      },
      {
        name: "robots",
        content: "index, follow",
      },
    ],
  };
};
