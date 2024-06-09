import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <h1 class='text-red-500'>testing</h1>
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
