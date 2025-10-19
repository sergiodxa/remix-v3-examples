import type { Remix } from "@remix-run/dom";
import { dom } from "@remix-run/events";

export function DragDropExample(this: Remix.Handle) {
  let items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  let draggedIndex: number | null = null;
  let dropTargetIndex: number | null = null;

  return () => (
    <>
      <ul css={{ listStyle: "none", padding: 0 }}>
        {items.map((item, index) => {
          const isDragging = draggedIndex === index;
          const isHovering = dropTargetIndex === index;
          const isDraggingDownward =
            draggedIndex !== null && draggedIndex < index;
          const isDraggingUpward =
            draggedIndex !== null && draggedIndex > index;
          const showIndicatorAbove = isHovering && isDraggingUpward;
          const showIndicatorBelow = isHovering && isDraggingDownward;

          return (
            <>
              {showIndicatorAbove && (
                <li
                  key={`drop-indicator-top-${index}`}
                  css={{
                    height: "4px",
                    margin: "4px 0",
                    backgroundColor: "#2196f3",
                    borderRadius: "2px",
                  }}
                />
              )}

              <li
                key={item}
                draggable
                css={{
                  padding: "12px",
                  margin: "8px 0",
                  backgroundColor: "#f0f0f0",
                  border: "2px solid #ccc",
                  cursor: "move",
                  userSelect: "none",
                  opacity: isDragging ? 0.5 : 1,
                }}
                on={[
                  dom.dragstart(() => {
                    draggedIndex = index;
                    this.update();
                  }),
                  dom.dragover((event) => {
                    event.preventDefault();
                    dropTargetIndex = index;
                    this.update();
                  }),
                  dom.dragleave(() => {
                    dropTargetIndex = null;
                    this.update();
                  }),
                  dom.drop(() => {
                    if (draggedIndex === null) return;

                    let newItems = [...items];
                    let [draggedItem] = newItems.splice(draggedIndex, 1);
                    if (draggedItem) newItems.splice(index, 0, draggedItem);
                    items = newItems;
                    draggedIndex = null;
                    dropTargetIndex = null;
                    this.update();
                  }),
                ]}
              >
                {index + 1}. {item}
              </li>

              {showIndicatorBelow && (
                <li
                  key={`drop-indicator-bottom-${index}`}
                  style={{
                    height: "4px",
                    margin: "4px 0",
                    backgroundColor: "#2196f3",
                    borderRadius: "2px",
                  }}
                />
              )}
            </>
          );
        })}
      </ul>
    </>
  );
}
