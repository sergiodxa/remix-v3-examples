import type { Remix } from "@remix-run/dom";
import { createEventType, events } from "@remix-run/events";
import { press } from "@remix-run/events/press";

const [change, createChange] = createEventType("change");

class Model extends EventTarget {
  #count = 0;

  get count() {
    return this.#count;
  }

  increment() {
    this.#count++;
    this.dispatchEvent(createChange());
  }

  decrement() {
    this.#count--;
    this.dispatchEvent(createChange());
  }
}

export function EventTargetExample(this: Remix.Handle) {
  const model = new Model();
  events(model, [change(() => this.update())]);

  return () => {
    return (
      <>
        <p>Count: {model.count}</p>
        <button on={[press(() => model.increment())]}>Increment</button>
        <button on={[press(() => model.decrement())]}>Decrement</button>
      </>
    );
  };
}
