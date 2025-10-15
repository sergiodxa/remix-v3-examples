import { createRoot, type Remix } from "@remix-run/dom";
import { ReduxExample } from "./state-libs/redux";
import { ZustandExample } from "./state-libs/zustand";
import { RxJSExample } from "./state-libs/rxjs";
import { XStateExample } from "./state-libs/xstate";
import { JotaiExample } from "./state-libs/jotai";
import { SignalsExample } from "./state-libs/signals";
import { QueryExample } from "./tanstack-libs/query";
import { FormExample } from "./tanstack-libs/form";
import { VirtualExample } from "./tanstack-libs/virtual";
import { TableExample } from "./tanstack-libs/table";
import { MotionExample } from "./animations/motion";

import {
  exampleSelector,
  ExampleSelector,
  ExampleSelectorModel,
} from "./components/example-selector";
import { events } from "@remix-run/events";

createRoot(document.getElementById("root")!).render(
  <div
    css={{
      margin: "2rem",
    }}
  >
    <h1>Hello, Remix v3</h1>
    <App />
  </div>,
);

function App(this: Remix.Handle) {
  events(exampleSelector, [ExampleSelectorModel.change(() => this.update())]);

  return () => (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "16px",
        button: {
          cursor: "pointer",
          fontSize: "1rem",
        },
      }}
    >
      <ExampleSelector />
      {exampleSelector.selected === "redux" && <ReduxExample />}
      {exampleSelector.selected === "zustand" && <ZustandExample />}
      {exampleSelector.selected === "rxjs" && <RxJSExample />}
      {exampleSelector.selected === "xstate" && <XStateExample />}
      {exampleSelector.selected === "jotai" && <JotaiExample />}
      {exampleSelector.selected === "signals" && <SignalsExample />}
      {exampleSelector.selected === "query" && <QueryExample />}
      {exampleSelector.selected === "form" && <FormExample />}
      {exampleSelector.selected === "virtual" && <VirtualExample />}
      {exampleSelector.selected === "table" && <TableExample />}
      {exampleSelector.selected === "motion" && <MotionExample />}
    </div>
  );
}
