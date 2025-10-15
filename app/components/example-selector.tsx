import type { Remix } from "@remix-run/dom";
import { createEventType, dom, events } from "@remix-run/events";

type Example =
  | "motion"
  | "redux"
  | "zustand"
  | "rxjs"
  | "xstate"
  | "jotai"
  | "signals"
  | "query"
  | "form"
  | "virtual"
  | "table";

const [change, createChange] = createEventType("change");

export class ExampleSelectorModel extends EventTarget {
  #example: Example = "motion";

  get selected() {
    return this.#example;
  }

  get options() {
    return {
      state: ["redux", "zustand", "rxjs", "xstate", "jotai", "signals"],
      tanstack: ["query", "form", "virtual", "table"],
      animation: ["motion"],
    } as const;
  }

  change(example: Example) {
    this.#example = example;
    this.dispatchEvent(createChange());
  }

  static change = change;
}

export const exampleSelector = new ExampleSelectorModel();

export function ExampleSelector(this: Remix.Handle) {
  events(exampleSelector, [ExampleSelectorModel.change(() => this.update())]);

  return () => {
    return (
      <select
        on={[
          dom.change((event) =>
            exampleSelector.change(event.currentTarget.value as Example),
          ),
        ]}
        css={{
          fontSize: "1rem",
        }}
      >
        {Object.entries(exampleSelector.options).map(([group, options]) => (
          <optgroup key={group} label={group}>
            {options.map((option) => (
              <option
                key={option}
                value={option}
                selected={option === exampleSelector.selected}
              >
                {option}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    );
  };
}
