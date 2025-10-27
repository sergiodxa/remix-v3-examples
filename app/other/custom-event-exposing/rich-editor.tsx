import { connect, type Remix } from "@remix-run/dom";
import { createEventType } from "@remix-run/events";
import { Editor } from "./editor";
import { press } from "@remix-run/events/press";

const [update, createUpdate] = createEventType<Editor.State>("update");

interface UpdateProps extends Pick<Remix.Props<"div">, "on"> {}

export function RichEditor(this: Remix.Handle) {
  const editor = new Editor();
  let div: HTMLDivElement;

  this.signal.addEventListener(
    "abort",
    editor.subscribe(() => {
      div.dispatchEvent(createUpdate({ detail: editor.state }));
    }),
    { once: true },
  );

  return ({ on = [] }: UpdateProps) => (
    <div
      on={[
        ...on,
        connect((event) => {
          div = event.currentTarget;
        }),
      ]}
    >
      <button on={[press(() => editor.doSomething())]}>Do Something</button>
    </div>
  );
}

RichEditor.update = update;
