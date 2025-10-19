import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { observable, autorun } from "mobx";

export function MobXExample(this: Remix.Handle) {
  const state = observable({ count: 0 });

  this.signal.addEventListener(
    "abort",
    autorun(() => {
      void state.count;
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
