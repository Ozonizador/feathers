const withTM = require("next-transpile-modules")(["flowbite-react"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM({ nextConfig });
