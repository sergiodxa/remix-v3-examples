import { press } from "@remix-run/events/press";

/**
 * @typedef {Object} SetupProps
 * @property {number} defaultCount - The default count value
 */

/**
 * @typedef {Object} RenderProps
 * @property {string} message - The message to display
 */

/**
 * @this {import("@remix-run/dom").Remix.Handle}
 * @param {SetupProps} setupProps
 */
export function JSDocExample(setupProps) {
  let count = setupProps.defaultCount || 0;

  /** @param {RenderProps} renderProps */
  return (renderProps) => (
    <button
      on={[
        press(() => {
          count++;
          this.update();
        }),
      ]}
    >
      {renderProps.message}: <span>{count}</span>
    </button>
  );
}
