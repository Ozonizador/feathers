const withTM = require("next-transpile-modules")(["flowbite-react"]);
const withPlugins = require("next-compose-plugins");
const removeImports = require("next-remove-imports")();
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["erlshltwlqhutsoglatg.supabase.co"],
  },
  i18n,
  compilerOptions: {
    baseUrl: ".",
  },
};

module.exports = removeImports(withPlugins([[withTM]], nextConfig));
