import type { Remix } from "@remix-run/dom";
import { dom } from "@remix-run/events";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const INITIAL_CODE = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

const user = { name: "World" };
greet(user.name);`;

const languages = [
  "javascript",
  "typescript",
  "python",
  "rust",
  "go",
  "java",
  "css",
  "html",
];

export function HighlightJsExample(this: Remix.Handle) {
  let code = INITIAL_CODE;
  let language = "javascript";
  let highlightedCode = hljs.highlight(code, { language }).value;

  return () => (
    <>
      <div>
        <label>
          <span>Language:</span>
          <select
            value={language}
            on={[
              dom.change((event) => {
                language = event.currentTarget.value;
                highlightedCode = hljs.highlight(code, { language }).value;
                this.update();
              }),
            ]}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div css={{ marginTop: "20px" }}>
        <h3>Code Input</h3>
        <textarea
          value={code}
          css={{
            width: "100%",
            height: "200px",
            fontFamily: "monospace",
            padding: "10px",
            boxSizing: "border-box",
          }}
          on={[
            dom.input((event) => {
              code = event.currentTarget.value;
              highlightedCode = hljs.highlight(code, { language }).value;
              this.update();
            }),
          ]}
        />
      </div>

      <div css={{ marginTop: "20px" }}>
        <h3>Highlighted Output</h3>
        <pre css={{ margin: 0 }}>
          <code
            class={`hljs language-${language}`}
            innerHTML={highlightedCode}
          />
        </pre>
      </div>
    </>
  );
}
