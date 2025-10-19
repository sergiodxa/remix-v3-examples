import type { Remix } from "@remix-run/dom";
import { connect } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
} from "@floating-ui/dom";

export function FloatingUIExample(this: Remix.Handle) {
  let isOpen = false;
  let buttonRef: HTMLButtonElement | null = null;
  let popoverRef: HTMLDivElement | null = null;
  let arrowRef: HTMLDivElement | null = null;

  const updatePosition = async () => {
    if (!buttonRef || !popoverRef || !arrowRef) return;

    const { x, y, placement, middlewareData } = await computePosition(
      buttonRef,
      popoverRef,
      {
        placement: "top",
        middleware: [
          offset(8),
          flip(),
          shift({ padding: 5 }),
          arrow({ element: arrowRef }),
        ],
      },
    );

    Object.assign(popoverRef.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    if (middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const side = placement.split("-")[0] as
        | "top"
        | "right"
        | "bottom"
        | "left";
      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[side];

      Object.assign(arrowRef.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px",
      });
    }
  };

  const togglePopover = async () => {
    isOpen = !isOpen;
    this.update();

    if (isOpen) {
      await updatePosition();
    }
  };

  return () => (
    <div css={{ position: "relative" }}>
      <button
        on={[
          connect((event) => (buttonRef = event.currentTarget)),
          press(togglePopover),
        ]}
      >
        {isOpen ? "Hide" : "Show"} Floating UI Popover
      </button>

      {isOpen && (
        <div
          on={[connect((event) => (popoverRef = event.currentTarget))]}
          css={{
            position: "absolute",
            background: "#2563eb",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            maxWidth: "200px",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            ".arrow": {
              position: "absolute",
              width: "8px",
              height: "8px",
              background: "#2563eb",
              transform: "rotate(45deg)",
            },
          }}
        >
          This is a popover positioned with Floating UI!
          <div
            class="arrow"
            on={[connect((event) => (arrowRef = event.currentTarget))]}
          />
        </div>
      )}
    </div>
  );
}
