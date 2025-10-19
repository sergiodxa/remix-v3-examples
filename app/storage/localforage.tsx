import type { Remix } from "@remix-run/dom";
import { dom } from "@remix-run/events";
import localforage from "localforage";

const STORAGE_KEY = "remix-example-localForage";

export function LocalForageExample(this: Remix.Handle) {
  let name: string;
  let status: "loading" | "idle" = "loading";

  localforage.getItem<string>(STORAGE_KEY).then((storedName) => {
    name = storedName ?? "World";
    status = "idle";
    if (!this.signal.aborted) this.update();
  });

  return () => {
    if (status === "loading") return <p>Loading from storage...</p>;
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
                localforage.setItem(STORAGE_KEY, name);
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
