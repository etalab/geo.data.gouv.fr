import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export default () => i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        Common: require('../locales/en.json')
      },
      fr: {
        Common: require('../locales/fr.json')
      }
    },
    fallbackLng: 'en',

    defaultNS: 'Common',

    interpolation: {
      formatSeparator: ','
    },

    react: {
      wait: true
    }
  })
