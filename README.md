# locize example: next-i18next

## What is this?

This is an example of how to use [next-i18next](https://github.com/i18next/next-i18next) v16 with [Next.js](https://nextjs.org) and [Locize](https://www.locize.com) to get translations up and running quickly and easily.

It demonstrates both the **App Router** and the **Pages Router** in a single project using the `basePath` option for mixed-router setups.

## For more info...

- [next-i18next v16 blog post](https://www.locize.com/blog/next-i18next-v16) — full setup guide
- [next-i18next README](https://github.com/i18next/next-i18next) — API reference and examples
- [next-i18next v16 examples](https://github.com/i18next/next-i18next/tree/master/examples) — more example projects

## How it works

### App Router (`/app-router/[locale]/`)

- **Server Components** use `getT()` from `next-i18next/server` to load translations from the filesystem (bundled via `resourceLoader`)
- **Client Components** use `I18nProvider` with `i18next-locize-backend` + `i18next-chained-backend` + `i18next-localstorage-backend` for live translation downloads with localStorage caching
- **Proxy** (`proxy.js`) handles language detection and routing, scoped to `/app-router/*` via `basePath`

### Pages Router (`/`)

- Uses the familiar `appWithTranslation` / `serverSideTranslations` API via `next-i18next/pages`
- Client-side translation reloading via `i18next-locize-backend` with chained backend
- Server-side translations bundled from `public/locales/` (downloaded via `locize-cli`)

### Locize integration

Translations are managed in [Locize](https://locize.com) and synced to the project:

1. **At build time**: `npm run downloadLocales` downloads translations from Locize to `public/locales/` via [locize-cli](https://github.com/locize/locize-cli)
2. **At runtime (client)**: `i18next-locize-backend` fetches fresh translations from the Locize CDN with localStorage caching (1 hour expiration)

This approach is ideal for serverless deployments — translations are bundled at build time, so no server-side HTTP requests are needed. The client can still get fresh translations from Locize.

## Setup

```bash
npm install
npm run downloadLocales  # download translations from Locize
npm run dev
```

- Pages Router: [http://localhost:3000](http://localhost:3000)
- App Router: [http://localhost:3000/app-router/en](http://localhost:3000/app-router/en)

## Configuration

### `next-i18next.config.js` (Pages Router)

Uses `i18next-locize-backend` on the client side with `i18next-chained-backend` for localStorage caching. Server side uses bundled translations from `public/locales/`.

### `i18n.config.js` (App Router)

Uses `resourceLoader` with dynamic imports for server-side loading. Client-side uses `I18nProviderWithLocize` wrapper that configures the chained backend with Locize.

### `proxy.js`

Handles language detection and routing for App Router pages, scoped to `/app-router/*` via `basePath: '/app-router'`.

## Locize project

This example uses the Locize project ID `d3b405cf-2532-46ae-adb8-99e88d876733`. Replace it with your own project ID to use your own translations.
