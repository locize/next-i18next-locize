module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  // this will download the translations from locize directly, in client (browser) and server (node.js)
  // DO NOT USE THIS if having a serverless environment => this will generate too much download requests
  //   => https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc
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

// for a serverless environment bundle the translations first. See downloadLocales script in package.json
// and configre this file like this:
// module.exports = {
//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en', 'de'],
//   }
// }