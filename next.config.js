const withPlugins = require('next-compose-plugins');
// Used for styling of external libraries imported at the top of `_app.tsx`
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps');
// transpile critical packages to target min chrome v51
const withTM = require('next-transpile-modules')(['swr', 'react-id-swiper', 'swiper', 'dom7']);

module.exports = withPlugins([withCSS, withTM, withSourceMaps], {
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
    SENTRY_DSN: process.env.SENTRY_DSN,
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
