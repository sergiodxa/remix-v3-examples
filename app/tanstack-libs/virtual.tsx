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
        style={{
          height: "400px",
          overflow: "auto",
          border: "1px solid #ccc",
        }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((item) => (
            <div
              key={item.key}
              style={{
                position: "absolute",
                width: "100%",
                height: `${item.size}px`,
                transform: `translateY(${item.start}px)`,
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
