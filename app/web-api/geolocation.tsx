import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";

export function GeolocationExample(this: Remix.Handle) {
  let coords: GeolocationCoordinates | null = null;
  let error: string | null = null;
  let status: "idle" | "loading" = "idle";

  return () => {
    let url = new URL("https://www.google.com/maps");
    if (coords) {
      url.searchParams.set("q", [coords.latitude, coords.longitude].join(","));
    }

    return (
      <>
        <button
          disabled={status === "loading"}
          on={[
            press(() => {
              coords = null;
              error = null;
              status = "loading";
              this.update();

              navigator.geolocation.getCurrentPosition(
                (position) => {
                  coords = position.coords;
                  status = "idle";
                  this.update();
                },
                (err) => {
                  error = err.message;
                  status = "idle";
                  this.update();
                },
              );
            }),
          ]}
        >
          {status === "loading" ? "Getting location..." : "Get My Location"}
        </button>

        {error && <p css={{ color: "red" }}>Error: {error}</p>}

        {coords && (
          <>
            <dl>
              <dt>Latitude:</dt>
              <dd>{coords.latitude.toFixed(6)}</dd>
              <dt>Longitude:</dt>
              <dd>{coords.longitude.toFixed(6)}</dd>
              <dt>Accuracy:</dt>
              <dd>±{coords.accuracy?.toFixed(0)}m</dd>
            </dl>

            <p>
              <a
                href={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </p>
          </>
        )}
      </>
    );
  };
}
