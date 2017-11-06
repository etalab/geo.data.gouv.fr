const i18n = require('i18next')
const XHR = require('i18next-xhr-backend')
const LanguageDetector = require('i18next-browser-languagedetector')
const moment = require('moment')

const dev = process.env.NODE_ENV !== 'production'

const availableLanguages = [
  'fr',
  'en'
]

const options = {
  fallbackLng: 'en',
  load: 'languageOnly',

  ns: ['common'],
  defaultNS: 'common',
  whitelist: [...availableLanguages],

  // debug: true,
  saveMissing: dev,

  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase()
      return value
    }
  },

  detection: {
    lookupCookie: 'locale',
    caches: ['cookie', 'localStorage']
  }
}

if (process.browser) {
  i18n
    .use(XHR)
    .use(LanguageDetector)

  i18n.on('languageChanged', lang => {
    moment.locale(lang)
  })
}

if (!i18n.isInitialized) {
  i18n.init(options)
}

i18n.availableLanguages = availableLanguages

module.exports = i18n
