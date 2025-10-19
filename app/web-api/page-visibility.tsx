import type { Remix } from "@remix-run/dom";
import { doc, events } from "@remix-run/events";

export function PageVisibilityExample(this: Remix.Handle) {
  let visibilityState = document.visibilityState;
  let visibilityChanges: DocumentVisibilityState[] = [];

  events(document, [
    doc.visibilitychange(() => {
      visibilityState = document.visibilityState;
      visibilityChanges.push(document.visibilityState);
      this.update();
    }),
  ]);

  return () => (
    <>
      <div
        css={{
          padding: "20px",
          backgroundColor:
            visibilityState === "visible" ? "#4caf50" : "#f44336",
          color: "white",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        <h3>Tab is currently: {visibilityState.toUpperCase()}</h3>
      </div>

      <div>
        <h3>Visibility Change Log</h3>
        {visibilityChanges.length === 0 ? (
          <p>No changes yet. Switch tabs to see the log!</p>
        ) : (
          <ul>
            {visibilityChanges.map((change, index) => (
              <li key={index}>{change}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
