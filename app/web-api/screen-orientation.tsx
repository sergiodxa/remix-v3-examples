import type { Remix } from "@remix-run/dom";
import { dom, events } from "@remix-run/events";
import { press } from "@remix-run/events/press";

export function ScreenOrientationExample(this: Remix.Handle) {
  let orientation = screen.orientation?.type || "unknown";
  let angle = screen.orientation?.angle || 0;
  let isSupported = "orientation" in screen;

  if (isSupported) {
    events(screen.orientation, [
      dom.change(() => {
        orientation = screen.orientation.type;
        angle = screen.orientation.angle;
        this.update();
      }),
    ]);
  }

  this.signal.addEventListener("abort", () => screen.orientation.unlock(), {
    once: true,
  });

  return () => {
    if (!isSupported) {
      return (
        <p style={{ color: "orange" }}>
          ⚠️ Screen Orientation API is not supported in this browser.
        </p>
      );
    }

    return (
      <>
        <div
          css={{
            padding: "20px",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          <h3>Current Orientation</h3>
          <p css={{ fontSize: "48px", margin: "10px 0" }}>
            {orientation.includes("portrait") ? "📱" : "📲"}
          </p>
          <p>
            <strong>Type:</strong> {orientation}
          </p>
          <p>
            <strong>Angle:</strong> {angle}°
          </p>
        </div>

        <div css={{ marginTop: "20px" }}>
          <button
            on={[
              press(async () => {
                try {
                  await (screen.orientation as any).lock("portrait");
                } catch {
                  alert(
                    "Failed to lock orientation. Try on a mobile device in fullscreen.",
                  );
                }
              }),
            ]}
          >
            Lock Portrait
          </button>

          <button
            on={[
              press(async () => {
                try {
                  await (screen.orientation as any).lock("landscape");
                } catch {
                  alert(
                    "Failed to lock orientation. Try on a mobile device in fullscreen.",
                  );
                }
              }),
            ]}
          >
            Lock Landscape
          </button>

          <button on={[press(() => screen.orientation.unlock())]}>
            Unlock
          </button>
        </div>
      </>
    );
  };
}
