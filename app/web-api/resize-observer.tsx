import { connect, type Remix } from "@remix-run/dom";

export function ResizeObserverExample(this: Remix.Handle) {
  let width = 0;
  let height = 0;

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      width = Math.round(entry.contentRect.width);
      height = Math.round(entry.contentRect.height);
      this.update();
    }
  });

  this.signal.addEventListener("abort", () => observer.disconnect(), {
    once: true,
  });

  return () => {
    return (
      <>
        <p>
          Size: {width}px × {height}px
        </p>

        <textarea
          on={[connect((event) => observer.observe(event.currentTarget))]}
          css={{
            resize: "both",
            overflow: "auto",
            minWidth: "200px",
            minHeight: "100px",
            padding: "10px",
            border: "2px solid #ccc",
          }}
          placeholder="Drag the bottom-right corner to resize..."
        />
      </>
    );
  };
}
