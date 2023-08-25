/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "pt",
    locales: ["en", "pt"],
    localePath: typeof window === "undefined" ? require("path").resolve("./public/locales") : "/locales",
  },
  fallbackLng: "pt",
  debug: true,
  /** To avoid issues when deploying to some paas (vercel...) */
};
