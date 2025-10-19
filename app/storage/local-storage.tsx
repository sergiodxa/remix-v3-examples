import type { Remix } from "@remix-run/dom";
import { dom } from "@remix-run/events";

const STORAGE_KEY = "remix-example-localStorage";

export function LocalStorageExample(this: Remix.Handle) {
  let name = localStorage.getItem(STORAGE_KEY) ?? "World";

  return () => {
    return (
      <>
        <label>
          <span>Name:</span>
          <input
            type="text"
            value={name}
            on={[
              dom.input((event) => {
                name = event.currentTarget.value;
                localStorage.setItem(STORAGE_KEY, name);
                this.update();
              }),
            ]}
          />
        </label>

        <p>Hello, {name}!</p>
      </>
    );
  };
}
