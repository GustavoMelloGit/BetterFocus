import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 32 32'
    >
      <path fill='currentColor' d='M12 12h2v12h-2zm6 0h2v12h-2z' />
      <path
        fill='currentColor'
        d='M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z'
      />
    </svg>
  );
});
