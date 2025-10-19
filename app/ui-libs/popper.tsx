import type { Remix } from "@remix-run/dom";
import { connect } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { createPopper, type Instance } from "@popperjs/core";

export function PopperExample(this: Remix.Handle) {
  let isOpen = false;
  let buttonRef: HTMLButtonElement | null = null;
  let popoverRef: HTMLDivElement | null = null;
  let arrowRef: HTMLDivElement | null = null;
  let popperInstance: Instance | null = null;

  const togglePopover = () => {
    isOpen = !isOpen;
    this.update();

    if (isOpen && buttonRef && popoverRef) {
      popperInstance = createPopper(buttonRef, popoverRef, {
        placement: "top",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "arrow",
            options: {
              element: arrowRef,
              padding: 5,
            },
          },
        ],
      });
    } else if (!isOpen && popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  };

  this.signal.addEventListener("abort", () => {
    if (popperInstance) {
      popperInstance.destroy();
    }
  });

  return () => (
    <div css={{ position: "relative" }}>
      <button
        on={[
          connect((event) => (buttonRef = event.currentTarget)),
          press(togglePopover),
        ]}
      >
        {isOpen ? "Hide" : "Show"} Popper Popover
      </button>

      {isOpen && (
        <div
          on={[connect((event) => (popoverRef = event.currentTarget))]}
          css={{
            background: "#333",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            maxWidth: "200px",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            "&[data-popper-placement^='top'] > .arrow": {
              bottom: "-4px",
            },
            "&[data-popper-placement^='bottom'] > .arrow": {
              top: "-4px",
            },
            ".arrow": {
              position: "absolute",
              width: "8px",
              height: "8px",
              background: "#333",
              transform: "rotate(45deg)",
            },
          }}
        >
          This is a popover positioned with Popper.js!
          <div
            class="arrow"
            data-popper-arrow
            on={[connect((event) => (arrowRef = event.currentTarget))]}
          />
        </div>
      )}
    </div>
  );
}
