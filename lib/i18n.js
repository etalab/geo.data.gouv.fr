const i18n = require('i18next')
const XHR = require('i18next-xhr-backend')
const LanguageDetector = require('i18next-browser-languagedetector')

const options = {
  fallbackLng: 'en',
  load: 'languageOnly',

  ns: ['common'],
  defaultNS: 'common',

  // debug: true,
  saveMissing: true,

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
  },

  react: {
    wait: false
  }
}

if (process.browser) {
  i18n
    .use(XHR)
    .use(LanguageDetector)
}

if (!i18n.isInitialized) {
  i18n.init(options)
}

module.exports = i18n
