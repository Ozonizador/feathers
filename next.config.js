const withTM = require("next-transpile-modules")(["flowbite-react"]);
const withPlugins = require("next-compose-plugins");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["repknakjxuwlkuloscsl.supabase.co"],
  },
};

module.exports = withPlugins([[withTM]], nextConfig);
