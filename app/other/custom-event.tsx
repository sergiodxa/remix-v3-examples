import { connect, type Remix } from "@remix-run/dom";
import { createEventType } from "@remix-run/events";
import { press } from "@remix-run/events/press";

export function CustomEventExample() {
  return <Parent />;
}

function Parent(this: Remix.Handle) {
  let count = 0;
  return () => {
    return (
      <>
        <Child
          on={Child.change((event) => {
            count = event.detail;
            this.update();
          })}
        />
        <span>Clicked {count} times</span>
      </>
    );
  };
}

const [change, createChange] = createEventType<number>("change");

interface ChildProps extends Pick<Remix.Props<"button">, "on"> {}

function Child() {
  let button: HTMLButtonElement;
  let pressCount = 0;

  return ({ on = [] }: ChildProps) => {
    return (
      <button
        type="button"
        on={[
          ...on,
          connect((event) => (button = event.currentTarget)),
          press(() => {
            pressCount++;
            button.dispatchEvent(createChange({ detail: pressCount }));
          }),
        ]}
      >
        Click me
      </button>
    );
  };
}

Child.change = change;
