import { connect, type Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";

export function WebAnimationsExample(this: Remix.Handle) {
  let isAnimating = false;
  let box: HTMLDivElement | null = null;
  let animation: Animation | null = null;

  this.signal.addEventListener("abort", () => animation?.cancel(), {
    once: true,
  });

  return () => {
    return (
      <>
        <button
          key="start-animation"
          disabled={isAnimating || box === null}
          on={[
            press((event, signal) => {
              if (event.currentTarget.disabled || !box || isAnimating) return;

              isAnimating = true;
              this.update();

              animation = box.animate(
                [
                  {
                    transform: "translateX(0px) rotate(0deg)",
                    backgroundColor: "#4caf50",
                  },
                  {
                    transform: "translateX(200px) rotate(180deg)",
                    backgroundColor: "#2196f3",
                  },
                  {
                    transform: "translateX(0px) rotate(360deg)",
                    backgroundColor: "#4caf50",
                  },
                ],
                { duration: 2000, easing: "ease-in-out" },
              );

              animation.addEventListener(
                "remove",
                () => {
                  isAnimating = false;
                  animation = null;
                  this.update();
                },
                { once: true, signal },
              );

              animation.addEventListener(
                "finish",
                () => {
                  isAnimating = false;
                  animation = null;
                  this.update();
                },
                { once: true, signal },
              );

              animation.addEventListener(
                "cancel",
                () => {
                  isAnimating = false;
                  animation = null;
                  this.update();
                },
                { once: true, signal },
              );
            }),
          ]}
        >
          {isAnimating ? "Animating..." : "Start Animation"}
        </button>

        <button
          key="reverse-animation"
          disabled={animation === null}
          on={[press(() => animation?.reverse())]}
        >
          Reverse Animation
        </button>

        <button
          key="stop-animation"
          disabled={animation === null}
          on={[press(() => animation?.cancel())]}
        >
          Stop Animation
        </button>

        <div css={{ marginTop: "20px", height: "100px" }}>
          <div
            on={[
              connect((event) => {
                box = event.currentTarget;
                this.update();
              }),
            ]}
            css={{
              width: "100px",
              height: "100px",
              backgroundColor: "#4caf50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Box
          </div>
        </div>
      </>
    );
  };
}
