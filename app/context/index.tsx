import { ContextConsumer } from "./consumer";
import { ContextProvider } from "./provider";

export function ContextExample() {
  return (
    <ContextProvider>
      <ContextConsumer />
    </ContextProvider>
  );
}
