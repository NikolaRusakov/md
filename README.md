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

## Tech Stack

| Front-End  | State management | Components   | Styling       | Monitoring | Deployment    | testing                  |
| ---------- | ---------------- | ------------ | ------------- | ---------- | ------------- | ------------------------ |
| Typescript | @reduxjs/toolkit | shaka-player | Emotion.js    | Sentry     | now -> Vercel | jest \*                  |
| React      | redux-observable | swiper.js    | styled-system |            |               | jest-marbles \*          |
| Next.js    |                  | react-window |               |            |               | react-testing-library \* |

> - needs to be introduced

### Roadmap / Nice to Haves

- [x] refactor state management away from duck structure
- [ ] make cover image more responsive (on detail page)
- [ ] test epics, some components
- [ ] page transitions
- [ ] fetch detail on video page (for title)
- [ ] introduce search query as query param in router on Search Page
- [ ] Generate types based on Swagger file (need to find)
