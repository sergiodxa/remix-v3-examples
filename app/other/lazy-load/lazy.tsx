import type { Remix } from "@remix-run/dom";

export function lazy<
  C = Remix.NoContext,
  S = Remix.ElementProps,
  R = Remix.ElementProps,
>(promise: Promise<Remix.Component<Remix.Handle<C>, S, R>>) {
  let Component: Remix.Component<Remix.Handle<C>, S, R>;

  return function LazyComponent(
    this: Remix.Handle,
    { fallback, ...setupProps }: S & { fallback?: Remix.RemixNode },
  ) {
    if (!Component) {
      this.queueTask(() => {
        promise.then((mod) => {
          Component = mod;
          this.update();
        });
      });
    }

    return (renderProps: R) => {
      if (Component) {
        return <Component {...({ ...setupProps, ...renderProps } as any)} />;
      }
      return fallback ?? null;
    };
  };
}
