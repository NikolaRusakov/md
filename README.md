# MD

Next.js project that demonstrates improved OTT app with SSR

## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/zeit/next.js/tree/canary/examples/hello-world)

## How to use

### Setup

- for local development pass following in [.env](.env)

```bash
MOVIEDB_API_URL="database endpoint"
MOVIEDB_API_KEY="generated database key"
```

### Running and deployment

- Project uses `yarn`
- to run locally

```bash
yarn
yarn dev
```

- project uses Vercel for deployment

```bash
# preview deployment
now

# production deployment
now --prod
```

Deploy it to the cloud with [Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
