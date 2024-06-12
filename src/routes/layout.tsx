import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <main class="flex min-h-svh flex-col dark:bg-gray-950">
      <Slot />
    </main>
  );
});
