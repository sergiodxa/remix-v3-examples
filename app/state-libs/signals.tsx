import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { signal, effect } from "@preact/signals-core";

export function SignalsExample(this: Remix.Handle) {
  const count = signal(0);
  this.queueTask(() => {
    this.signal.addEventListener(
      "abort",
      effect(() => {
        void count.value;
        this.update();
      }),
      { once: true },
    );
  });

  return () => {
    return (
      <>
        <p>Count: {count.value}</p>
        <button on={[press(() => count.value++)]}>Increment</button>
        <button on={[press(() => count.value--)]}>Decrement</button>
      </>
    );
  };
}
