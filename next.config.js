const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.icons8.com", "image.icons8.com"],
  },
};

module.exports = nextConfig;
