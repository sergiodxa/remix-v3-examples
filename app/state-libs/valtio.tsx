import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { proxy, subscribe } from "valtio";

export function ValtioExample(this: Remix.Handle) {
  const state = proxy({ count: 0 });

  this.signal.addEventListener(
    "abort",
    subscribe(state, () => {
      this.update();
    }),
    { once: true },
  );

  return () => {
    return (
      <>
        <p>Count: {state.count}</p>
        <button on={[press(() => state.count++)]}>Increment</button>
        <button on={[press(() => state.count--)]}>Decrement</button>
      </>
    );
  };
}
