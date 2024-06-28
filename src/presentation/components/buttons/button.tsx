import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";
import { cn } from "~/presentation/utils/cn";
import { Spinner } from "../icons/spinner";

type Props = QwikIntrinsicElements["button"] & {
  isLoading?: boolean;
};
export const Button = component$<Props>(
  ({ class: className, isLoading = false, ...props }) => {
    return (
      <button
        type="button"
        class={cn([
          "rounded-md bg-gray-950 px-5 py-3 text-white",
          className as string,
        ])}
        {...props}
      >
        {isLoading ? <Spinner /> : <Slot />}
      </button>
    );
  },
);
