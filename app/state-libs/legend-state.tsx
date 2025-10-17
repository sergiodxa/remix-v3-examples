import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { observable } from "@legendapp/state";

export function LegendStateExample(this: Remix.Handle) {
  const count$ = observable(0);

  this.signal.addEventListener(
    "abort",
    count$.onChange(() => this.update()),
    { once: true },
  );

  return () => {
    return (
      <>
        <p>Count: {count$.get()}</p>
        <button on={[press(() => count$.set((v) => v + 1))]}>Increment</button>
        <button on={[press(() => count$.set((v) => v - 1))]}>Decrement</button>
      </>
    );
  };
}
