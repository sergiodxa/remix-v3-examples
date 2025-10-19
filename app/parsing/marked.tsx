import type { Remix } from "@remix-run/dom";
import { dom } from "@remix-run/events";
import { marked } from "marked";

const INITIAL_MARKDOWN = `# Hello, Markdown!

This is a **Marked** example showing _live_ markdown preview.

## Features

- Parse markdown to HTML
- Live preview
- Support for all markdown features

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

[Visit Remix](https://remix.run)`;

export function MarkedExample(this: Remix.Handle) {
  let markdown = INITIAL_MARKDOWN;
  let html = marked(markdown) as string;

  return () => (
    <>
      <div
        css={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div>
          <h3>Markdown Input</h3>
          <textarea
            value={markdown}
            css={{
              width: "100%",
              height: "400px",
              fontFamily: "monospace",
              padding: "10px",
              boxSizing: "border-box",
            }}
            on={[
              dom.input((event) => {
                markdown = event.currentTarget.value;
                html = marked(markdown) as string;
                this.update();
              }),
            ]}
          />
        </div>

        <div>
          <h3>HTML Preview</h3>
          <div
            css={{
              border: "1px solid #ccc",
              padding: "10px",
              height: "400px",
              overflow: "auto",
              boxSizing: "border-box",
            }}
            innerHTML={html}
          />
        </div>
      </div>
    </>
  );
}
