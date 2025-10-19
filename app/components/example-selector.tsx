import type { Remix } from "@remix-run/dom";
import { createEventType, dom, events } from "@remix-run/events";

type Example =
  | "motion"
  | "vanilla"
  | "event-target"
  | "redux"
  | "zustand"
  | "rxjs"
  | "xstate"
  | "xstate-store"
  | "jotai"
  | "signals"
  | "legend-state"
  | "valtio"
  | "nanostores"
  | "mobx"
  | "query"
  | "form"
  | "virtual"
  | "table"
  | "i18next"
  | "formatjs"
  | "fuse"
  | "match-sorter"
  | "local-storage"
  | "localforage"
  | "idb"
  | "context";

interface RenderProps {
  render(example: Example): Remix.RemixNode;
}

const [change, createChange] = createEventType("change");

class Model extends EventTarget {
  get selected(): Example {
    let searchParams = new URLSearchParams(window.location.search);
    return (searchParams.get("example") ?? "context") as Example;
  }

  get options() {
    return {
      state: [
        "vanilla",
        "event-target",
        "redux",
        "zustand",
        "rxjs",
        "xstate",
        "xstate-store",
        "jotai",
        "signals",
        "legend-state",
        "valtio",
        "nanostores",
        "mobx",
      ],
      tanstack: ["query", "form", "virtual", "table"],
      animation: ["motion"],
      i18n: ["i18next", "formatjs"],
      search: ["fuse", "match-sorter"],
      storage: ["local-storage", "localforage", "idb"],
      other: ["context"],
    } as const;
  }

  change(example: Example) {
    history.pushState(null, "", `?example=${example}`);
    this.dispatchEvent(createChange());
  }
}

export function ExampleSelector(this: Remix.Handle) {
  const model = new Model();
  events(model, [change(() => this.update())]);

  return (props: RenderProps) => {
    return (
      <>
        <select
          css={{ fontSize: "1rem" }}
          on={[
            dom.change((event) =>
              model.change(event.currentTarget.value as Example),
            ),
          ]}
        >
          {Object.entries(model.options).map(([group, options]) => (
            <optgroup key={group} label={group}>
              {options.map((option) => (
                <option
                  key={option}
                  value={option}
                  selected={option === model.selected}
                >
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {props.render(model.selected)}
      </>
    );
  };
}
