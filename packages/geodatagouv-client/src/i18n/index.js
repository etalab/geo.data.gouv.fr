import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import moment from 'moment'

import { injectLocale } from './helpers'

const defaultNamespace = 'Common'
const availableLanguages = [
  'fr',
  'en'
]

export default () => {
  const i18n = i18next
    .use(LanguageDetector)
    .init({
      resources: availableLanguages.reduce((resources, lang) => ({
        ...resources,
        [lang]: {}
      }), {}),

      whitelist: [
        ...availableLanguages
      ],

      lng: 'fr',
      fallbackLng: 'fr',

      defaultNS: defaultNamespace,

      interpolation: {
        formatSeparator: ','
      },

      react: {
        wait: process.env.BROWSER === true
      }
    })

  availableLanguages.forEach(locale => {
    injectLocale(i18n, {
      locale,
      namespace: defaultNamespace,
      resources: require(`../locales/${locale}.json`)
    })
  })

  i18n.availableLanguages = availableLanguages
  moment.locale(i18n.language)

  return i18n
}
