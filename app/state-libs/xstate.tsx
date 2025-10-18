import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { createMachine, createActor, assign } from "xstate";

const counterMachine = createMachine({
  context: { count: 0 },
  on: {
    INCREMENT: {
      actions: assign({ count: ({ context }) => context.count + 1 }),
    },
    DECREMENT: {
      actions: assign({ count: ({ context }) => context.count - 1 }),
    },
  },
});

export function XStateExample(this: Remix.Handle) {
  const actor = createActor(counterMachine).start();

  this.signal.addEventListener(
    "abort",
    actor.subscribe(() => this.update()).unsubscribe,
    { once: true },
  );

  return () => {
    let snapshot = actor.getSnapshot();
    return (
      <>
        <p>Count: {snapshot.context.count}</p>
        <button on={[press(() => actor.send({ type: "INCREMENT" }))]}>
          Increment
        </button>
        <button on={[press(() => actor.send({ type: "DECREMENT" }))]}>
          Decrement
        </button>
      </>
    );
  };
}
