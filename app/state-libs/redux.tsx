import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { legacy_createStore as createStore } from "redux";

interface State {
  count: number;
}

type Action = { type: "INCREMENT" } | { type: "DECREMENT" };

export function ReduxExample(this: Remix.Handle) {
  const store = createStore<State, Action>((state = { count: 0 }, action) => {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + 1 };
      case "DECREMENT":
        return { count: state.count - 1 };
      default:
        return state;
    }
  });

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
        <button on={[press(() => store.dispatch({ type: "INCREMENT" }))]}>
          Increment
        </button>
        <button on={[press(() => store.dispatch({ type: "DECREMENT" }))]}>
          Decrement
        </button>
      </>
    );
  };
}
