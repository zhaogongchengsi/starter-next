const { withSuperjson } = require("next-superjson");

module.exports = withSuperjson()({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
  experimental: {
    appDir: true,
  },
  eslint: {
    // 在生产环境中禁止在 eslint 错误后 影响应用打包
    ignoreDuringBuilds: true,
  },
});
