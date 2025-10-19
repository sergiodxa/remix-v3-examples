import { connect, type Remix } from "@remix-run/dom";

const listFormatter = new Intl.ListFormat("en", {
  style: "short",
  type: "conjunction",
});

export function IntersectionObserverExample(this: Remix.Handle) {
  let visibleBoxes: Set<number> = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const boxId = Number(entry.target.getAttribute("data-box-id"));
        if (entry.isIntersecting) {
          visibleBoxes.add(boxId);
        } else {
          visibleBoxes.delete(boxId);
        }
      }
      this.update();
    },
    { threshold: 0.5 },
  );

  this.signal.addEventListener("abort", () => observer.disconnect(), {
    once: true,
  });

  return () => {
    return (
      <>
        <p>
          Visible boxes:{" "}
          {visibleBoxes.size > 0
            ? listFormatter.format(Array.from(visibleBoxes).map(String))
            : "None"}
        </p>

        <div
          css={{
            width: "300px",
            height: "300px",
            overflowY: "scroll",
            border: "1px solid",
          }}
        >
          {Array.from({ length: 20 }, (_, i) => {
            let id = i + 1;
            return (
              <div
                key={i}
                data-box-id={id}
                on={[connect((event) => observer.observe(event.currentTarget))]}
                css={{
                  height: "100px",
                  margin: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: visibleBoxes.has(id) ? "#4caf50" : "#ccc",
                  color: visibleBoxes.has(id) ? "white" : "black",
                  transition: "background-color 0.3s",
                }}
              >
                Box {id}
              </div>
            );
          })}
        </div>
      </>
    );
  };
}
