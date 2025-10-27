import type { Remix } from "@remix-run/dom";
import "./tailwind.css";

export function TailwindExample(this: Remix.Handle) {
  return () => (
    <div class="flex flex-col gap-y-4">
      <div class="p-6 bg-blue-500 text-white rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-2">Blue Card</h3>
        <p>This card uses Tailwind's utility classes for styling.</p>
      </div>

      <div class="p-6 bg-green-500 text-white rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-2">Green Card</h3>
        <p>Padding, background, text color, rounded corners, and shadows!</p>
      </div>

      <div class="p-6 bg-purple-500 text-white rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-2">Purple Card</h3>
        <p>All styled with simple utility classes - no custom CSS needed.</p>
      </div>

      <div class="flex gap-4 mt-6">
        <button class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
          Primary Button
        </button>
        <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
          Secondary Button
        </button>
      </div>
    </div>
  );
}
