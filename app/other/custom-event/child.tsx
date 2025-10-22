import { connect, type Remix } from "@remix-run/dom";
import { createEventType } from "@remix-run/events";
import { press } from "@remix-run/events/press";

const [click, createClick] = createEventType("click");

interface ChildProps extends Pick<Remix.Props<"button">, "on"> {}

export function Child() {
  let button: HTMLButtonElement;

  return ({ on = [] }: ChildProps) => (
    <button
      type="button"
      on={[
        ...on,
        connect((event) => (button = event.currentTarget)),
        press(() => button.dispatchEvent(createClick())),
      ]}
    >
      Click me
    </button>
  );
}

Child.click = click;
