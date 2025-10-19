import type { Remix } from "@remix-run/dom";
import { dom } from "@remix-run/events";
import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "remix-examples-idb";
const STORE_NAME = "settings";
const STORAGE_KEY = "name";

export function IDBExample(this: Remix.Handle) {
  let name: string;
  let status: "loading" | "idle" = "loading";

  let db: IDBPDatabase;

  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  })
    .then((database) => {
      db = database;
      return db.get(STORE_NAME, STORAGE_KEY);
    })
    .then((storedName) => {
      name = storedName ?? "World";
      status = "idle";
      if (!this.signal.aborted) this.update();
    });

  this.signal.addEventListener("abort", () => db?.close(), { once: true });

  return () => {
    if (status === "loading") return <p>Loading from IndexedDB...</p>;

    return (
      <>
        <label>
          <span>Name:</span>
          <input
            type="text"
            value={name}
            on={[
              dom.input(async (event) => {
                name = event.currentTarget.value;
                await db.put(STORE_NAME, name, STORAGE_KEY);
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
