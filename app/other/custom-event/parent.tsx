import type { Remix } from "@remix-run/dom";
import { Child } from "./child";

export function Parent(this: Remix.Handle) {
  let count = 0;

  return () => (
    <>
      <Child
        on={Child.click(() => {
          count++;
          this.update();
        })}
      />
      <span>Clicked {count} times</span>
    </>
  );
}
