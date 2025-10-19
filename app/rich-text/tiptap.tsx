import { connect, type Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const DEFAULT_CONTENT = `
  <h2>Welcome to TipTap!</h2>
  <p>This is a <strong>rich text editor</strong> built with <em>TipTap</em> and Remix v3.</p>
  <h3>Features:</h3>
  <ul>
    <li>Bold, italic, and other text formatting</li>
    <li>Headings (H1, H2, H3)</li>
    <li>Lists (ordered and unordered)</li>
    <li>Code blocks</li>
    <li>Blockquotes</li>
  </ul>
  <blockquote>
    <p>"TipTap is a headless wrapper around ProseMirror"</p>
  </blockquote>
  <p>Try editing this text!</p>
`;

export function TipTapExample(this: Remix.Handle) {
  const editor = new Editor({
    element: null,
    extensions: [StarterKit],
    content: DEFAULT_CONTENT,
    editorProps: {
      attributes: {
        style:
          "padding: 10px; min-height: 300px; border: 1px solid #ccc; border-radius: 4px; outline: none;",
      },
    },
    onUpdate: () => this.update(),
  });

  this.signal.addEventListener("abort", () => editor.destroy(), { once: true });

  return () => (
    <>
      <div
        css={{
          marginBottom: "10px",
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleBold().run();
            }),
          ]}
          css={{
            fontWeight: editor?.isActive("bold") ? "bold" : "normal",
            backgroundColor: editor?.isActive("bold") ? "#e0e0e0" : "white",
          }}
        >
          Bold
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleItalic().run();
            }),
          ]}
          css={{
            fontStyle: editor?.isActive("italic") ? "italic" : "normal",
            backgroundColor: editor?.isActive("italic") ? "#e0e0e0" : "white",
          }}
        >
          Italic
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleStrike().run();
            }),
          ]}
          css={{
            textDecoration: editor?.isActive("strike")
              ? "line-through"
              : "none",
            backgroundColor: editor?.isActive("strike") ? "#e0e0e0" : "white",
          }}
        >
          Strike
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleCode().run();
            }),
          ]}
          css={{
            fontFamily: editor?.isActive("code") ? "monospace" : "inherit",
            backgroundColor: editor?.isActive("code") ? "#e0e0e0" : "white",
          }}
        >
          Code
        </button>

        <span css={{ borderLeft: "1px solid #ccc", margin: "0 5px" }} />

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleHeading({ level: 1 }).run();
            }),
          ]}
          css={{
            backgroundColor: editor?.isActive("heading", { level: 1 })
              ? "#e0e0e0"
              : "white",
          }}
        >
          H1
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleHeading({ level: 2 }).run();
            }),
          ]}
          css={{
            backgroundColor: editor?.isActive("heading", { level: 2 })
              ? "#e0e0e0"
              : "white",
          }}
        >
          H2
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleHeading({ level: 3 }).run();
            }),
          ]}
          css={{
            backgroundColor: editor?.isActive("heading", { level: 3 })
              ? "#e0e0e0"
              : "white",
          }}
        >
          H3
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().setParagraph().run();
            }),
          ]}
          css={{
            backgroundColor: editor?.isActive("paragraph")
              ? "#e0e0e0"
              : "white",
          }}
        >
          Paragraph
        </button>

        <span css={{ borderLeft: "1px solid #ccc", margin: "0 5px" }} />

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleBulletList().run();
            }),
          ]}
          css={{
            backgroundColor: editor?.isActive("bulletList")
              ? "#e0e0e0"
              : "white",
          }}
        >
          Bullet List
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleOrderedList().run();
            }),
          ]}
          css={{
            backgroundColor: editor?.isActive("orderedList")
              ? "#e0e0e0"
              : "white",
          }}
        >
          Ordered List
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleCodeBlock().run();
            }),
          ]}
          css={{
            backgroundColor: editor?.isActive("codeBlock")
              ? "#e0e0e0"
              : "white",
          }}
        >
          Code Block
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().toggleBlockquote().run();
            }),
          ]}
          css={{
            backgroundColor: editor?.isActive("blockquote")
              ? "#e0e0e0"
              : "white",
          }}
        >
          Quote
        </button>

        <span css={{ borderLeft: "1px solid #ccc", margin: "0 5px" }} />

        <button
          on={[
            press(() => {
              editor?.chain().focus().setHorizontalRule().run();
            }),
          ]}
        >
          Horizontal Rule
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().undo().run();
            }),
          ]}
          disabled={!editor?.can().undo()}
        >
          Undo
        </button>

        <button
          on={[
            press(() => {
              editor?.chain().focus().redo().run();
            }),
          ]}
          disabled={!editor?.can().redo()}
        >
          Redo
        </button>
      </div>

      <div on={[connect((event) => editor.mount(event.currentTarget))]} />

      <details css={{ marginTop: "20px" }}>
        <summary css={{ cursor: "pointer" }}>View HTML Output</summary>
        <div
          css={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
        >
          <div>
            <h4>HTML Code:</h4>
            <pre
              css={{
                backgroundColor: "#f5f5f5",
                padding: "10px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              <code>{editor.getHTML()}</code>
            </pre>
          </div>
          <div>
            <h4>Rendered Output:</h4>
            <div
              css={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "4px",
              }}
              innerHTML={editor.getHTML()}
            />
          </div>
        </div>
      </details>
    </>
  );
}
