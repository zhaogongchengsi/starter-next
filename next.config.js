const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
  // experimental: {
  //   appDir: true,
  // },
});
