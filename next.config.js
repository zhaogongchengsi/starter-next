const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()({
  // async rewrites() {
  //   return [
  //     {
  //       source: "/zAdmin/:path*",
  //       destination: "/admin", // The :path parameter isn't used here so will be automatically passed in the query
  //     },
  //   ];
  // },
});
