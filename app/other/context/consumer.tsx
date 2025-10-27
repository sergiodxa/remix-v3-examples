import type { Remix } from "@remix-run/dom";
import { ContextProvider } from "./provider";

export function ContextConsumer(this: Remix.Handle) {
  let context = this.context.get(ContextProvider);
  return <p>Context ID: {context.id}</p>;
}
