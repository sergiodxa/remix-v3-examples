/**
 * This module simulates being a third-party rich text editor library
 * that exposes a custom event for state changes.
 */
export class Editor extends EventTarget {
  state: Editor.State = { value: "Value from Editor.state" };

  doSomething() {
    this.dispatchEvent(new Event("update"));
  }

  subscribe(cb: () => void) {
    this.addEventListener("update", cb);
    return () => this.removeEventListener("update", cb);
  }
}

export namespace Editor {
  export interface State {
    value: string;
  }
}
