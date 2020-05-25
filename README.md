# MD

Next.js project that demonstrates improved OTT app with SSR

## Includes
- browse page with server-side rendered carousels
- detail page
- video page
- search page allowing search including virtual scroll functionality on content scroll

## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/zeit/next.js/tree/canary/examples/hello-world)

## How to use

### Setup

- for local development pass following in [.env](.env)
- [Uses movie database (TMDb) as back-end](https://www.themoviedb.org/)

```bash
MOVIEDB_API_URL="database endpoint"
MOVIEDB_API_KEY_PARAM="key?='insert your key'"
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
- [ ] hydrate Redux from SSR to Client
- [ ] sanitize search expression before calling API [here](https://dev.to/jam3/how-to-prevent-xss-attacks-when-using-dangerouslysetinnerhtml-in-react-1464) 
- [ ] introduce API erroring in Redux 
- [ ] page transitions
- [ ] fetch detail on video page (for title)
- [ ] introduce search query as query param in router on Search Page
- [ ] Generate types based on Swagger file (need to find)
