import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";

export function VanillaExample(this: Remix.Handle) {
  let count = 0;

  return () => {
    return (
      <>
        <p>Count: {count}</p>
        <button
          on={[
            press(() => {
              count++;
              this.update();
            }),
          ]}
        >
          Increment
        </button>
        <button
          on={[
            press(() => {
              count--;
              this.update();
            }),
          ]}
        >
          Decrement
        </button>
      </>
    );
  };
}
