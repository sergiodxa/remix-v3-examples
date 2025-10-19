import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { dom } from "@remix-run/events";

const name = "remix-example-channel";

export function BroadcastChannelExample(this: Remix.Handle) {
  const channel = new BroadcastChannel(name);

  let message = "Hello from this tab!";
  let receivedMessages: string[] = [];

  channel.addEventListener(
    "message",
    (event) => {
      let message = `${new Date().toLocaleTimeString()}: ${event.data}`;
      receivedMessages.push(message);
      this.update();
    },
    { signal: this.signal },
  );

  this.signal.addEventListener("abort", () => channel.close(), { once: true });

  return () => (
    <>
      <div>
        <label>
          <span>Message:</span>
          <input
            type="text"
            value={message}
            on={[
              dom.input((event) => {
                message = event.currentTarget.value;
                this.update();
              }),
            ]}
          />
        </label>

        <button on={[press(() => channel.postMessage(message))]}>
          Send Message
        </button>
      </div>

      <div>
        <h3>Received Messages</h3>
        {receivedMessages.length === 0 ? (
          <p>
            No messages received yet. Open this page in another tab and send a
            message!
          </p>
        ) : (
          <ul>
            {receivedMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
