/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "pt",
    locales: ["en", "pt"],
    /** To avoid issues when deploying to some paas (vercel...) */
    // localePath: typeof window === "undefined" ? require("path").resolve("./public/locales") : "/locales",
    // reloadOnPrerender: process.env.NODE_ENV === "development",
  },
  fallbackLng: "pt",
  debug: process.env.NODE_ENV === "development",
  reactDevOverlay: process.env.NODE_ENV === "development"
};
