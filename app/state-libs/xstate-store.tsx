import type { Remix } from '@remix-run/dom';
import { press } from '@remix-run/events/press';
import { createAtom } from '@xstate/store';

export function XStateStoreExample(this: Remix.Handle) {
  const countAtom = createAtom(0);

  this.signal.addEventListener(
    'abort',
    countAtom.subscribe(() => this.update()).unsubscribe,
    { once: true }
  );

  return () => {
    let count = countAtom.get();
    return (
      <>
        <p>Count: {count}</p>
        <button on={[press(() => countAtom.set((prev) => prev + 1))]}>
          Increment
        </button>
        <button on={[press(() => countAtom.set((prev) => prev - 1))]}>
          Decrement
        </button>
      </>
    );
  };
}
