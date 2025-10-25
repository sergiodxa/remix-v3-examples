import { lazy } from "./lazy";

const LazyInputField = lazy(
  sleep(1000) // Simulate network delay
    .then(() => import("./input-field"))
    .then((module) => module.InputField), // Pick the export,
);

export function LazyLoadExample() {
  return (
    <LazyInputField
      defaultValue="This component was lazy-loaded!"
      fallback={<div>Loading...</div>} // Optional fallback UI
    />
  );
}

function sleep(duration: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, duration));
}
