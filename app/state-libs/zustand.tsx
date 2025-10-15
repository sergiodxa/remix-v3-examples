import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { createStore } from "zustand/vanilla";

interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export function ZustandExample(this: Remix.Handle) {
  const store = createStore<Store>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }));

  this.signal.addEventListener(
    "abort",
    store.subscribe(() => this.update()),
    { once: true },
  );

  return () => {
    let state = store.getState();

    return (
      <>
        <p>Count: {state.count}</p>
        <button on={[press(() => state.increment())]}>Increment</button>
        <button on={[press(() => state.decrement())]}>Decrement</button>
      </>
    );
  };
}
