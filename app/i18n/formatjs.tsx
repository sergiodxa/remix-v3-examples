import type { Remix } from "@remix-run/dom";
import { submit } from "@remix-run/events";
import { createIntl, createIntlCache } from "@formatjs/intl";

interface Translation {
  greeting: string;
  description: string;
  changeLanguage: string;
  currentLanguage: string;
}

// This could be loaded from a separate file or fetched from a server
const messages = {
  en: {
    greeting: "Hello, World!",
    description: "This is an example of FormatJS internationalization.",
    changeLanguage: "Change Language:",
    currentLanguage: "Current language:",
  } satisfies Translation,
  es: {
    greeting: "¡Hola, Mundo!",
    description: "Este es un ejemplo de internacionalización con FormatJS.",
    changeLanguage: "Cambiar Idioma:",
    currentLanguage: "Idioma actual:",
  } satisfies Translation,
  ja: {
    greeting: "こんにちは、世界！",
    description: "これはFormatJSの国際化の例です。",
    changeLanguage: "言語を変更:",
    currentLanguage: "現在の言語:",
  } satisfies Translation,
} as const;

type SupportedLanguage = keyof typeof messages;

export function FormatJSExample(this: Remix.Handle) {
  const cache = createIntlCache();

  let currentLocale: SupportedLanguage = "en";
  let intl = createIntl(
    { locale: currentLocale, messages: messages[currentLocale] },
    cache,
  );

  return () => (
    <>
      <h2>{intl.formatMessage({ id: "greeting" })}</h2>
      <p>{intl.formatMessage({ id: "description" })}</p>

      <form
        on={[
          submit((formData) => {
            const language = formData.get("language");
            if (language === "en" || language === "es" || language === "ja") {
              currentLocale = language;
              intl = createIntl(
                { locale: currentLocale, messages: messages[currentLocale] },
                cache,
              );

              this.update();
            }
          }),
        ]}
      >
        <label>
          <span>{intl.formatMessage({ id: "currentLanguage" })}</span>
          <select name="language" value={currentLocale}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="ja">日本語</option>
          </select>
        </label>

        <button type="submit">
          {intl.formatMessage({ id: "changeLanguage" })}
        </button>
      </form>

      <p>
        <span>{intl.formatMessage({ id: "currentLanguage" })}</span>{" "}
        <strong>{currentLocale.toUpperCase()}</strong>
      </p>
    </>
  );
}
