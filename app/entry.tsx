import { createRoot } from "@remix-run/dom";

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
import { ContextExample } from "./context";

import { ExampleSelector } from "./components/example-selector";
import { EventTargetExample } from "./state-libs/event-target";
import { LegendStateExample } from "./state-libs/legend-state";
import { XStateStoreExample } from "./state-libs/xstate-store";

createRoot(document.getElementById("root")!).render(
  <div css={{ margin: "2rem" }}>
    <h1>Hello, Remix v3</h1>

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
      <ExampleSelector
        render={(selected) => {
          if (selected === "event-target") return <EventTargetExample />;
          if (selected === "redux") return <ReduxExample />;
          if (selected === "zustand") return <ZustandExample />;
          if (selected === "rxjs") return <RxJSExample />;
          if (selected === "xstate") return <XStateExample />;
          if (selected === "xstate-store") return <XStateStoreExample />;
          if (selected === "jotai") return <JotaiExample />;
          if (selected === "signals") return <SignalsExample />;
          if (selected === "query") return <QueryExample />;
          if (selected === "form") return <FormExample />;
          if (selected === "virtual") return <VirtualExample />;
          if (selected === "table") return <TableExample />;
          if (selected === "motion") return <MotionExample />;
          if (selected === "context") return <ContextExample />;
          if (selected === "legend-state") return <LegendStateExample />;
          return null;
        }}
      />
    </div>
  </div>,
);
