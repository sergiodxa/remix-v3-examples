import { connect, type Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { animate, stagger } from "motion";

export function MotionExample(this: Remix.Handle) {
  let isAnimating = false;
  let $container: HTMLDivElement | null = null;

  return () => {
    return (
      <>
        <div>
          <button
            disabled={isAnimating}
            on={[
              press(async () => {
                if (!$container || isAnimating) return;

                isAnimating = true;
                this.update();

                await animate(
                  $container.querySelectorAll("div"),
                  { scale: [1, 1.5, 1], rotate: [0, 360] },
                  { duration: 1, delay: stagger(0.1) },
                ).finished;

                isAnimating = false;
                this.update();
              }),
            ]}
          >
            {isAnimating ? "Animating..." : "Animate Boxes"}
          </button>
        </div>

        <div
          css={{
            display: "flex",
            gap: "16px",
            marginTop: "16px",
            flexWrap: "wrap",
            ".motion-box": {
              width: "60px",
              height: "60px",
              background: `hsl(calc(var(--i) * 60), 70%, 60%)`,
              borderRadius: "8px",
            },
          }}
          on={[connect((event) => ($container = event.currentTarget))]}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} class="motion-box" style={{ "--i": i }} />
          ))}
        </div>
      </>
    );
  };
}
