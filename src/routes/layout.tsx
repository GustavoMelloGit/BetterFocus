import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <main class='min-h-svh flex flex-col dark:bg-gray-950'>
      <Slot />
    </main>
  );
});
