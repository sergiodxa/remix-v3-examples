import { RichEditor } from "./rich-editor";

export function CustomEventExposingExample() {
  return () => (
    <RichEditor
      on={[
        RichEditor.update((event) => {
          console.log(event.detail); // this is a Editor.State value
        }),
      ]}
    />
  );
}
