import { connect, type Remix } from "@remix-run/dom";
import {
  Virtualizer,
  observeElementRect,
  observeElementOffset,
  elementScroll,
} from "@tanstack/virtual-core";

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export function VirtualExample(this: Remix.Handle) {
  let scrollElement: HTMLDivElement | null = null;

  const virtualizer = new Virtualizer({
    count: items.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => 35,
    overscan: 5,
    scrollToFn: elementScroll,
    observeElementRect,
    observeElementOffset,
    onChange: () => this.update(),
  });

  this.signal.addEventListener("abort", virtualizer._didMount(), {
    once: true,
  });

  return () => (
    <>
      <p>Virtualizing 10,000 items</p>

      <div
        on={[
          connect((event) => {
            scrollElement = event.currentTarget;
            virtualizer._willUpdate();
          }),
        ]}
        css={{
          width: "100%",
          height: "400px",
          overflow: "auto",
          border: "1px solid #ccc",
        }}
      >
        <div
          css={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((item) => (
            <div
              key={item.key}
              style={{
                "--start": `${item.start}px`,
                "--size": `${item.size}px`,
              }}
              css={{
                position: "absolute",
                width: "100%",
                height: "var(--size)",
                transform: `translateY(var(--start))`,
              }}
            >
              {items[item.index]}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
