import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { atom } from "nanostores";

export function NanostoresExample(this: Remix.Handle) {
  const count = atom(0);

  this.queueTask(() => {
    this.signal.addEventListener(
      "abort",
      count.subscribe(() => {
        this.update();
      }),
      { once: true },
    );
  });

  return () => {
    return (
      <>
        <p>Count: {count.get()}</p>
        <button on={[press(() => count.set(count.get() + 1))]}>
          Increment
        </button>
        <button on={[press(() => count.set(count.get() - 1))]}>
          Decrement
        </button>
      </>
    );
  };
}
