import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { BehaviorSubject } from "rxjs";

export function RxJSExample(this: Remix.Handle) {
  const count$ = new BehaviorSubject(0);
  const actions$ = new BehaviorSubject<"INCREMENT" | "DECREMENT" | null>(null);

  actions$.subscribe((action) => {
    if (!action) return;
    if (action === "INCREMENT") count$.next(count$.value + 1);
    if (action === "DECREMENT") count$.next(count$.value - 1);
  });

  this.queueTask(() => {
    const subscription = count$.subscribe(() => this.update());
    this.signal.addEventListener("abort", () => subscription.unsubscribe(), {
      once: true,
    });
  });

  return () => {
    return (
      <>
        <p>Count: {count$.value}</p>
        <button on={[press(() => actions$.next("INCREMENT"))]}>
          Increment
        </button>
        <button on={[press(() => actions$.next("DECREMENT"))]}>
          Decrement
        </button>
      </>
    );
  };
}
