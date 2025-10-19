import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";
import { dom } from "@remix-run/events";

export function ShareExample(this: Remix.Handle) {
  const isSupported = typeof navigator.share !== "undefined";

  let shareData: ShareData = {
    title: "Check out Remix v3!",
    text: "Remix v3 is amazing for building web apps",
    url: "https://remix.run",
  };

  return () => {
    if (!isSupported) {
      return (
        <p css={{ color: "orange" }}>
          ⚠️ Share API is not supported in this browser. Try on mobile or a
          supported browser.
        </p>
      );
    }
    return (
      <>
        <label>
          <span>Title:</span>
          <input
            type="text"
            value={shareData.title}
            on={[
              dom.input((event) => {
                shareData.title = event.currentTarget.value;
                this.update();
              }),
            ]}
          />
        </label>

        <label>
          <span>Text:</span>
          <input
            type="text"
            value={shareData.text}
            on={[
              dom.input((event) => {
                shareData.text = event.currentTarget.value;
                this.update();
              }),
            ]}
          />
        </label>

        <label>
          <span>URL:</span>
          <input
            type="url"
            value={shareData.url}
            on={[
              dom.input((event) => {
                shareData.url = event.currentTarget.value;
                this.update();
              }),
            ]}
          />
        </label>

        <button
          disabled={!isSupported}
          on={[
            press(() => {
              navigator.share(shareData).catch((error) => {
                console.error(error);
              });
            }),
          ]}
        >
          Share
        </button>
      </>
    );
  };
}
