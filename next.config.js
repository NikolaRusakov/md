const withPlugins = require('next-compose-plugins');
// Used for styling of external libraries imported at the top of `_app.tsx`
const withCSS = require('@zeit/next-css');

module.exports = withPlugins([withCSS], {
  target: 'serverless',
  env: {
    MOVIEDB_API_URL: process.env.MOVIEDB_API_URL,
    MOVIEDB_API_KEY: process.env.MOVIEDB_API_KEY,
    MOVIEDB_API_KEY_PARAM: process.env.MOVIEDB_API_KEY_PARAM,
  },
  // [publicRuntimeConfig] is passed to make queries work on SSR+Client [https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration](docs)
  publicRuntimeConfig: {
    MOVIEDB_API_URL: process.env.MOVIEDB_API_URL,
    MOVIEDB_API_KEY: process.env.MOVIEDB_API_KEY,
    MOVIEDB_API_KEY_PARAM: process.env.MOVIEDB_API_KEY_PARAM,
  },
  // allows importing SVGs into Next.js directly
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
