const withTM = require("next-transpile-modules")([]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
});
