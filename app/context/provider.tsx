import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";

interface ContextType {
  id: string;
}

interface SetupProps {
  children: Remix.RemixNode;
}

export function ContextProvider(
  this: Remix.Handle<ContextType>,
  setupProps: SetupProps,
) {
  let context = { id: crypto.randomUUID() };
  this.context.set(context);

  return () => {
    return (
      <>
        <button
          on={[
            press(() => {
              context.id = crypto.randomUUID();
              this.update();
            }),
          ]}
        >
          Regenerate ID
        </button>

        {setupProps.children}
      </>
    );
  };
}
