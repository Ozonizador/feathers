/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLanguage: "pt",
    fallbackLng: ["pt"],
    defaultLocale: "pt",
    locales: ["en", "pt"],
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath: typeof window === "undefined" ? require("path").resolve("./public/locales") : "/locales",
};
