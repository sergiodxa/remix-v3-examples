import type { Remix } from "@remix-run/dom";
import { submit } from "@remix-run/events";
import i18next from "i18next";

interface Translation {
  greeting: string;
  description: string;
  changeLanguage: string;
  currentLanguage: string;
}

// This could be loaded from a separate file or fetched from a server
const resources = {
  en: {
    translation: {
      greeting: "Hello, World!",
      description: "This is an example of i18next internationalization.",
      changeLanguage: "Change Language:",
      currentLanguage: "Current language:",
    } satisfies Translation,
  },
  es: {
    translation: {
      greeting: "¡Hola, Mundo!",
      description: "Este es un ejemplo de internacionalización con i18next.",
      changeLanguage: "Cambiar Idioma:",
      currentLanguage: "Idioma actual:",
    } satisfies Translation,
  },
  ja: {
    translation: {
      greeting: "こんにちは、世界！",
      description: "これはi18nextの国際化の例です。",
      changeLanguage: "言語を変更:",
      currentLanguage: "現在の言語:",
    } satisfies Translation,
  },
} as const;

export function I18NextExample(this: Remix.Handle) {
  const rerender = () => this.update();

  i18next
    .init({ lng: "en", resources, supportedLngs: ["es", "ja", "en"] })
    .then(() => {
      i18next.on("languageChanged", rerender);
      this.signal.addEventListener(
        "abort",
        () => i18next.off("languageChanged", rerender),
        { once: true },
      );
    });

  return () => (
    <>
      <h2>{i18next.t("greeting")}</h2>
      <p>{i18next.t("description")}</p>

      <form
        on={[
          submit((formData) => {
            const language = formData.get("language");
            if (typeof language === "string") {
              console.log(`Changing language to ${language}`);
              i18next.changeLanguage(language);
            }
          }),
        ]}
      >
        <label>
          <span>{i18next.t("currentLanguage")}</span>
          <select name="language">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="ja">日本語</option>
          </select>
        </label>

        <button type="submit">{i18next.t("changeLanguage")}</button>
      </form>

      <p>
        <span>{i18next.t("currentLanguage")}</span>{" "}
        <strong>{i18next.language.toUpperCase()}</strong>
      </p>
    </>
  );
}

// Type-safety for i18next translations
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: { translation: Translation };
  }
}
