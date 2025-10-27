import { createRoot } from "@remix-run/dom";

import { ReduxExample } from "./state-libs/redux";
import { ZustandExample } from "./state-libs/zustand";
import { RxJSExample } from "./state-libs/rxjs";
import { XStateExample } from "./state-libs/xstate";
import { JotaiExample } from "./state-libs/jotai";
import { SignalsExample } from "./state-libs/signals";
import { ValtioExample } from "./state-libs/valtio";
import { NanostoresExample } from "./state-libs/nanostores";
import { MobXExample } from "./state-libs/mobx";
import { QueryExample } from "./tanstack-libs/query";
import { FormExample } from "./tanstack-libs/form";
import { VirtualExample } from "./tanstack-libs/virtual";
import { TableExample } from "./tanstack-libs/table";
import { MotionExample } from "./animations/motion";
import { I18NextExample } from "./i18n/i18next";
import { FormatJSExample } from "./i18n/formatjs";
import { FuseExample } from "./search/fuse";
import { MatchSorterExample } from "./search/match-sorter";
import { LocalStorageExample } from "./storage/local-storage";
import { LocalForageExample } from "./storage/localforage";
import { IDBExample } from "./storage/idb";
import { MarkedExample } from "./parsing/marked";
import { HighlightJsExample } from "./parsing/highlight-js";
import { TipTapExample } from "./rich-text/tiptap";
import { TailwindExample } from "./styling/tailwind";
import { IntersectionObserverExample } from "./web-api/intersection-observer";
import { ResizeObserverExample } from "./web-api/resize-observer";
import { WebAnimationsExample } from "./web-api/web-animations";
import { DragDropExample } from "./web-api/drag-drop";
import { ClipboardExample } from "./web-api/clipboard";
import { NotificationExample } from "./web-api/notification";
import { GeolocationExample } from "./web-api/geolocation";
import { ShareExample } from "./web-api/share";
import { BroadcastChannelExample } from "./web-api/broadcast-channel";
import { PageVisibilityExample } from "./web-api/page-visibility";
import { ScreenOrientationExample } from "./web-api/screen-orientation";
import { FullscreenExample } from "./web-api/fullscreen";
import { ContextExample } from "./other/context";
import { EventTargetExample } from "./state-libs/event-target";
import { LegendStateExample } from "./state-libs/legend-state";
import { XStateStoreExample } from "./state-libs/xstate-store";
import { VanillaExample } from "./state-libs/vanilla";
import { ExampleSelector } from "./components/example-selector";
import { CustomEventExample } from "./other/custom-event";
import { CustomEventExposingExample } from "./other/custom-event-exposing";
import { LazyLoadExample } from "./other/lazy-load";
import { JSDocExample } from "./other/jsdoc";

createRoot(document.getElementById("root")!).render(
  <div css={{ margin: "2rem" }}>
    <h1>Hello, Remix v3</h1>

    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "16px",
        button: {
          cursor: "pointer",
          fontSize: "1rem",
        },
      }}
    >
      <ExampleSelector
        render={(selected) => {
          if (selected === "vanilla") return <VanillaExample />;
          if (selected === "event-target") return <EventTargetExample />;
          if (selected === "redux") return <ReduxExample />;
          if (selected === "zustand") return <ZustandExample />;
          if (selected === "rxjs") return <RxJSExample />;
          if (selected === "xstate") return <XStateExample />;
          if (selected === "xstate-store") return <XStateStoreExample />;
          if (selected === "jotai") return <JotaiExample />;
          if (selected === "signals") return <SignalsExample />;
          if (selected === "legend-state") return <LegendStateExample />;
          if (selected === "valtio") return <ValtioExample />;
          if (selected === "nanostores") return <NanostoresExample />;
          if (selected === "mobx") return <MobXExample />;
          if (selected === "query") return <QueryExample />;
          if (selected === "form") return <FormExample />;
          if (selected === "virtual") return <VirtualExample />;
          if (selected === "table") return <TableExample />;
          if (selected === "motion") return <MotionExample />;
          if (selected === "i18next") return <I18NextExample />;
          if (selected === "formatjs") return <FormatJSExample />;
          if (selected === "fuse") return <FuseExample />;
          if (selected === "match-sorter") return <MatchSorterExample />;
          if (selected === "local-storage") return <LocalStorageExample />;
          if (selected === "localforage") return <LocalForageExample />;
          if (selected === "idb") return <IDBExample />;
          if (selected === "marked") return <MarkedExample />;
          if (selected === "highlight-js") return <HighlightJsExample />;
          if (selected === "tiptap") return <TipTapExample />;
          if (selected === "tailwind") return <TailwindExample />;
          if (selected === "resize-observer") return <ResizeObserverExample />;
          if (selected === "web-animations") return <WebAnimationsExample />;
          if (selected === "drag-drop") return <DragDropExample />;
          if (selected === "clipboard") return <ClipboardExample />;
          if (selected === "notification") return <NotificationExample />;
          if (selected === "geolocation") return <GeolocationExample />;
          if (selected === "share") return <ShareExample />;
          if (selected === "page-visibility") return <PageVisibilityExample />;
          if (selected === "fullscreen") return <FullscreenExample />;
          if (selected === "context") return <ContextExample />;
          if (selected === "custom-event") return <CustomEventExample />;
          if (selected === "intersection-observer") {
            return <IntersectionObserverExample />;
          }
          if (selected === "broadcast-channel") {
            return <BroadcastChannelExample />;
          }
          if (selected === "screen-orientation") {
            return <ScreenOrientationExample />;
          }
          if (selected === "custom-event-exposing") {
            return <CustomEventExposingExample />;
          }
          if (selected === "lazy-load") {
            return <LazyLoadExample />;
          }
          if (selected === "jsdoc") {
            return <JSDocExample defaultCount={10} message="Count" />;
          }
          return null;
        }}
      />
    </div>
  </div>,
);
