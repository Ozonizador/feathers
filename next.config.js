const withTM = require("next-transpile-modules")(["flowbite-react"]);
const withPlugins = require("next-compose-plugins");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["erlshltwlqhutsoglatg.supabase.co"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = withPlugins([[withTM]], nextConfig);
