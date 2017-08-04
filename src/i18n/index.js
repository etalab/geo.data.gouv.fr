import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import moment from 'moment'

const availableLanguages = [
  'en',
  'fr'
]

export default () => {
  const i18n = i18next
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

      whitelist: [
        ...availableLanguages
      ],

      fallbackLng: 'en',

      defaultNS: 'Common',

      interpolation: {
        formatSeparator: ','
      },

      react: {
        wait: true
      }
    })

  i18n.availableLanguages = availableLanguages
  moment.locale(i18n.language)

  return i18n
}
