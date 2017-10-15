import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'
import moment from 'moment'

import { injectLocale } from './helpers'

const defaultNamespace = 'Common'
const availableLanguages = [
  'fr',
  'en'
]

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources: availableLanguages.reduce((resources, lang) => ({
      ...resources,
      [lang]: {}
    }), {}),

    whitelist: [
      ...availableLanguages
    ],

    fallbackLng: 'fr',

    defaultNS: defaultNamespace,

    interpolation: {
      formatSeparator: ','
    },

    react: {
      wait: true
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

export default i18n
