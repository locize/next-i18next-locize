# locize example: next-i18next

## What is this?

This is a simple example of how to use [next-i18next](https://github.com/isaachinman/next-i18next) with [NextJs](https://github.com/zeit/next.js) and [locize](https://locize.com) to get translations up and running quickly and easily.

## For more info...

You may have arrived here from the [NextJs](https://github.com/zeit/next.js) repository, or the [react-i18next](https://github.com/i18next/react-i18next/) repository. Either way, for more documentation, please visit the [main README](https://github.com/isaachinman/next-i18next).

## 2 possibilities to use locize

### POSSIBILITY 1: config for locize live download usage

This will download the translations from locize directly, in client (browser) and server (node.js)

**DO NOT USE THIS if having a serverless environment => this will generate too much download requests**
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
    referenceLng: 'en'
  },
  use: [
    require('i18next-locize-backend/cjs')
  ],
  ns: ['common', 'footer', 'second-page'], // the namespaces nees to be listed here, to make sure they got preloaded
  serializeConfig: false, // because of the custom use i18next plugin
  // debug: true,
}
```

### POSSIBILITY 2: bundle translations with app

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