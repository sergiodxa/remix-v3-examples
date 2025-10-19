import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { dom } from "@remix-run/events";

export function ClipboardExample(this: Remix.Handle) {
  let textToCopy = "Hello from Remix v3!";
  let copiedText = "";
  let statusMessage = "";

  return () => (
    <>
      <div>
        <label>
          <span>Text to copy:</span>
          <input
            type="text"
            value={textToCopy}
            on={[
              dom.input((event) => {
                textToCopy = event.currentTarget.value;
                this.update();
              }),
            ]}
          />
        </label>

        <button
          on={[
            press(async () => {
              try {
                await navigator.clipboard.writeText(textToCopy);
                statusMessage = "✓ Copied to clipboard!";
                this.update();
                setTimeout(() => {
                  if (this.signal.aborted) return;
                  statusMessage = "";
                  this.update();
                }, 2000);
              } catch {
                statusMessage = "✗ Failed to copy";
                this.update();
              }
            }),
          ]}
        >
          Copy to Clipboard
        </button>

        {statusMessage && <span> {statusMessage}</span>}
      </div>

      <div>
        <button
          on={[
            press(async () => {
              try {
                copiedText = await navigator.clipboard.readText();
                this.update();
              } catch {
                copiedText = "Failed to read clipboard (permission denied)";
                this.update();
              }
            }),
          ]}
        >
          Read from Clipboard
        </button>

        {copiedText && (
          <p>
            Clipboard content: <strong>{copiedText}</strong>
          </p>
        )}
      </div>
    </>
  );
}
