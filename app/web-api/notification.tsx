import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { dom } from "@remix-run/events";

export function NotificationExample(this: Remix.Handle) {
  let permission = Notification.permission;

  let title = "Hello from Remix!";
  let body = "This is a browser notification";

  return () => (
    <>
      <p>
        Permission status: <strong>{permission}</strong>
      </p>

      {permission === "default" && (
        <button
          on={[
            press(async () => {
              permission = await Notification.requestPermission();
              this.update();
            }),
          ]}
        >
          Request Permission
        </button>
      )}

      {permission === "granted" && (
        <div>
          <label>
            <span>Notification title:</span>
            <input
              type="text"
              value={title}
              on={[
                dom.input((event) => {
                  title = event.currentTarget.value;
                  this.update();
                }),
              ]}
            />
          </label>

          <label>
            <span>Notification body:</span>
            <input
              type="text"
              value={body}
              on={[
                dom.input((event) => {
                  body = event.currentTarget.value;
                  this.update();
                }),
              ]}
            />
          </label>

          <button
            on={[
              press(() => {
                new Notification(title, {
                  body: body,
                  icon: "https://remix.run/favicon.ico",
                });
              }),
            ]}
          >
            Send Notification
          </button>
        </div>
      )}

      {permission === "denied" && (
        <p style={{ color: "red" }}>
          Notifications are blocked. Please enable them in your browser
          settings.
        </p>
      )}
    </>
  );
}
