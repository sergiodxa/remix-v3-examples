import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment(state) {
      return state + 1;
    },
    decrement(state) {
      return state - 1;
    },
  },
});

export function ReduxExample(this: Remix.Handle) {
  const store = configureStore({ reducer: counterSlice.reducer });

  this.signal.addEventListener(
    "abort",
    store.subscribe(() => this.update()),
    { once: true },
  );

  return () => (
    <>
      <p>Count: {store.getState()}</p>
      <button
        on={[press(() => store.dispatch(counterSlice.actions.increment()))]}
      >
        Increment
      </button>
      <button
        on={[press(() => store.dispatch(counterSlice.actions.decrement()))]}
      >
        Decrement
      </button>
    </>
  );
}
