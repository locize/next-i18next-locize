module.exports = require('./index')

const ChainedBackend = require('i18next-chained-backend')
const FSBackend = require('i18next-fs-backend/cjs')
const LocizeBackend = require('i18next-locize-backend/cjs')

module.exports.backend = {
  debug: process.env.NODE_ENV === 'development',
  // reloadInterval: 24 * 60 * 1000, // reload translations all 24h
  backends: [
    FSBackend,
    LocizeBackend
  ],
  backendOptions: [{ // make sure public/locales_cache/en and public/locales_cache/de exists
    loadPath: './public/locales_cache/{{lng}}/{{ns}}.json',
    addPath: './public/locales_cache/{{lng}}/{{ns}}.json',
    expirationTime: 30 * 1000 // all 60 minutes the cache should be deleted
  }, module.exports.backend]
}
module.exports.use = [ChainedBackend]