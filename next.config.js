const removeImports = require("next-remove-imports")();
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ifeoxbhtgdcuajhutxcf.supabase.co"],
  },
  i18n,
  compilerOptions: {
    baseUrl: ".",
  },
  transpilePackages: ["flowbite-react"],
  // output: "standalone",
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
  distDir: ".next",
  output: "standalone",
};

module.exports = removeImports(nextConfig);
