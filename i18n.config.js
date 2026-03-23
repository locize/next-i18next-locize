/** @type {import('next-i18next/proxy').I18nConfig} */
const i18nConfig = {
  supportedLngs: ['en', 'de'],
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'footer', 'second-page'],
  basePath: '/app-router',
  resourceLoader: (language, namespace) =>
    import(`./public/locales/${language}/${namespace}.json`),
}

module.exports = i18nConfig
