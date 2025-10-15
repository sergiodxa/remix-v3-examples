import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { createStore, atom } from "jotai/vanilla";

export function JotaiExample(this: Remix.Handle) {
  const countAtom = atom(0);
  const store = createStore();

  this.signal.addEventListener(
    "abort",
    store.sub(countAtom, () => this.update()),
    { once: true },
  );

  return () => {
    let count = store.get(countAtom);
    return (
      <>
        <p>Count: {count}</p>
        <button on={[press(() => store.set(countAtom, (prev) => prev + 1))]}>
          Increment
        </button>
        <button on={[press(() => store.set(countAtom, (prev) => prev - 1))]}>
          Decrement
        </button>
      </>
    );
  };
}
