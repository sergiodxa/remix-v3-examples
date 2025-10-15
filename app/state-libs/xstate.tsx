import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { createMachine, createActor } from "xstate";

const counterMachine = createMachine({
  id: "counter",
  initial: "active",
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: ({ context }) => {
            context.count++;
          },
        },
        DECREMENT: {
          actions: ({ context }) => {
            context.count--;
          },
        },
      },
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
