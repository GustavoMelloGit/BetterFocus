import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, Fragment } from '@builder.io/qwik';
import { cn } from '~/presentation/utils/cn';

type Props = Omit<QwikIntrinsicElements['input'], 'class'> & {
  class?: string;
};

export default component$<Props>(({ class: className, ...props }) => {
  return (
    <Fragment>
      <input
        type='checkbox'
        id={props.id ?? props.name}
        value=''
        class='hidden peer'
        {...props}
      />
      <label
        for={props.id ?? props.name}
        class={cn([
          'center p-0.5 rounded-full cursor-pointer',
          'border-[thin] dark:border-[#3B9464] dark:hover:border-green-500',
          'dark:text-gray-950',
          'peer-checked:dark:bg-[#3B9464] peer-checked:dark:hover:bg-green-500',
          className,
        ])}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='1em'
          height='1em'
          viewBox='0 0 24 24'
        >
          <g fill='none' fill-rule='evenodd'>
            <path d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
            <path
              fill='currentColor'
              d='M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0'
            />
          </g>
        </svg>
      </label>
    </Fragment>
  );
});
