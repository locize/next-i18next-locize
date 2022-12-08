# locize example: next-i18next

## What is this?

This is a simple example of how to use [next-i18next](https://github.com/i18next/next-i18next) with [NextJs](https://github.com/zeit/next.js) and [locize](https://locize.com) to get translations up and running quickly and easily.

## For more info...

You may have arrived here from the [NextJs](https://github.com/zeit/next.js) repository, or the [react-i18next](https://github.com/i18next/react-i18next/) repository. Either way, for more documentation, please visit the [main README](https://github.com/i18next/next-i18next).

### static example

In case you're looking to build a static NextJs project with i18n support and are getting this error when you run `next export`:
>Error: i18n support is not compatible with next export. See here for more info on deploying: https://nextjs.org/docs/deployment

You may have a look at [this example](https://github.com/adrai/next-language-detector/tree/main/examples/basic) or [this example](https://github.com/adrai/next-language-detector/tree/main/examples/client-loading).

## If you're using Next.js 13 with app directory, follow [this blog post](https://locize.com/blog/next-13-app-dir-i18n)

[![](https://locize.com/blog/next-13-app-dir-i18n/next-13-app-dir-i18n.jpg)](https://locize.com/blog/next-13-app-dir-i18n)


## 3 possibilities to use locize

### POSSIBILITY 1: locize live download usage on client side only

Since Next.js apps are usually deployed on serverless environments, we will use the [i18next-locize-backend plugin](https://github.com/locize/i18next-locize-backend) only on client side.

Instead on server side we'll "bundle" the translations first.
See [downloadLocales script in package.json](https://github.com/locize/next-i18next-locize/blob/main/package.json#L6).
We're doing so to prevent an elevated amount of downloads. [Read this](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc) for more information about this topic about serverless environments.

Before "deploying" your app, you can run the [downloadLocales script](https://github.com/locize/next-i18next-locize/blob/main/package.json#L6) (or similar), which will use the [cli](https://github.com/locize/locize-cli) to download the translations from locize into the appropriate folder next-i18next is looking in to (i.e. ./public/locales).
This way the translations are bundled in your app and on server side you will not generate any downloads to the [locize CDN](https://docs.locize.com/whats-inside/cdn-content-delivery-network) during runtime, but just on client side.

This approach is also handled in [this blog post](https://locize.com/blog/next-i18next/).

```javascript
// next-i18next.config.js
const LocizeBackend = require('i18next-locize-backend/cjs')
const ChainedBackend= require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

// If you've configured caching for your locize version, you may not need the i18next-localstorage-backend and i18next-chained-backend plugin.
// https://docs.locize.com/more/caching

const isBrowser = typeof window !== 'undefined'

module.exports = {
  // debug: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'it'],
  },
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
      version: 'latest'
    }],
    backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
  },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : [],
  // saveMissing: true // to not saveMissing to true for production
}
```


### POSSIBILITY 2: config for locize live download usage

This will download the translations from locize directly, in client (browser) and server (node.js)

**DO NOT USE THIS if having a serverless environment => this will generate too much download requests!**

More informations about this [here](https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc)

```javascript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: {
    projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
    // apiKey: 'myApiKey', // to not add the api-key in production, used for saveMissing feature
    referenceLng: 'en'
  },
  use: [
    require('i18next-locize-backend/cjs')
  ],
  ns: ['common', 'footer', 'second-page'], // the namespaces needs to be listed here, to make sure they got preloaded
  serializeConfig: false, // because of the custom use i18next plugin
  // debug: true,
  // saveMissing: true, // to not saveMissing to true for production
}
```


<h4>Optional server side caching to filesystem</h4>

There is also the possibility to cache the translations to the local filesystem thanks to the [i18next-chained-backend](https://github.com/i18next/i18next-chained-backend).

To do so, you need to control which i18next config should be used on client side and which on server side.

In the [local-caching branch](https://github.com/locize/next-i18next-locize/tree/local-caching) you'll see [how the config is separated](https://github.com/locize/next-i18next-locize/tree/local-caching/next-i18next.config.js).

Here `next-i18next.config.js` is not a file anymore, but a folder containing:
- [index.js](https://github.com/locize/next-i18next-locize/tree/local-caching/next-i18next.config.js/index.js) the original next-i18next.config.js content, which should be used on client side
- [node.js](https://github.com/locize/next-i18next-locize/tree/local-caching/next-i18next.config.js/node.js) the specific config for server side only
- [package.json](https://github.com/locize/next-i18next-locize/tree/local-caching/next-i18next.config.js/package.json) defining which file should be used for browser environment and which for Node.js environment

The resulting [node.js](https://github.com/locize/next-i18next-locize/tree/local-caching/next-i18next.config.js/node.js) file basically will contain these information:

```javascript
const ChainedBackend = require('i18next-chained-backend')
const FSBackend = require('i18next-fs-backend/cjs')
const LocizeBackend = require('i18next-locize-backend/cjs')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: {
    backends: [
      FSBackend,
      LocizeBackend
    ],
    backendOptions: [{ // make sure public/locales_cache/en and public/locales_cache/de exists
      loadPath: './public/locales_cache/{{lng}}/{{ns}}.json',
      addPath: './public/locales_cache/{{lng}}/{{ns}}.json',
      expirationTime: 60 * 60 * 1000 // all 60 minutes the cache should be deleted
    }, {
      projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
      referenceLng: 'en'
    }]
  },
  use: [ChainedBackend],
  ns: ['common', 'footer', 'second-page'], // the namespaces needs to be listed here, to make sure they got preloaded
  serializeConfig: false, // because of the custom use i18next plugin
  // debug: true,
}
```


### POSSIBILITY 3: bundle translations with app

**If you're not sure, choose this way.**

i.e. for a serverless environment bundle the translations first.
See [downloadLocales script in package.json](https://github.com/locize/next-i18next-locize/blob/main/package.json#L6) and use a config like this:

```javascript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  }
}
```

Before "deploying" your app, you can run the [downloadLocales script](https://github.com/locize/next-i18next-locize/blob/main/package.json#L6) (or similar), which will use the [cli](https://github.com/locize/locize-cli) to download the translations from locize into the appropriate folder next-i18next is looking in to (i.e. ./public/locales).
This way the translations are bundled in your app and you will not generate any downloads during runtime.
