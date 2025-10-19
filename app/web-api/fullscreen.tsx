import type { Remix } from "@remix-run/dom";
import { doc, events } from "@remix-run/events";
import { press } from "@remix-run/events/press";

export function FullscreenExample(this: Remix.Handle) {
  let isFullscreen = !!document.fullscreenElement;

  events(document, [
    doc.fullscreenchange(() => {
      isFullscreen = !!document.fullscreenElement;
      this.update();
    }),
  ]);

  return () => (
    <>
      <div
        css={{
          padding: "40px",
          backgroundColor: isFullscreen ? "#4caf50" : "#2196f3",
          color: "white",
          borderRadius: "4px",
          textAlign: "center",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 css={{ fontSize: isFullscreen ? "48px" : "24px" }}>
          {isFullscreen ? "🖥️ Fullscreen Mode" : "📺 Normal Mode"}
        </h3>

        {isFullscreen ? (
          <button
            css={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "18px",
            }}
            on={[press(() => document.exitFullscreen())]}
          >
            Exit Fullscreen
          </button>
        ) : (
          <button
            css={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "18px",
            }}
            on={[
              press(() =>
                document.documentElement.requestFullscreen({
                  navigationUI: "hide",
                }),
              ),
            ]}
          >
            Enter Fullscreen
          </button>
        )}
      </div>

      <p css={{ marginTop: "20px" }}>
        Press <kbd>ESC</kbd> to exit fullscreen mode at any time.
      </p>
    </>
  );
}
