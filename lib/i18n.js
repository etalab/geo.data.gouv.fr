import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import moment from 'moment'

const dev = process.env.NODE_ENV !== 'production'

export const languages = [
  'fr',
  'en'
]

if (!i18n.isInitialized) {
  // eslint-disable-next-line import/no-named-as-default-member
  i18n
    .use(XHR)
    .init({
      fallbackLng: 'fr',
      load: 'languageOnly',
      lowerCaseLng: true,

      ns: ['common'],
      defaultNS: 'common',
      whitelist: [...languages],

      saveMissing: dev,

      interpolation: {
        escapeValue: false,
        formatSeparator: ',',
        format: (value, format) => {
          if (format === 'uppercase') {
            return value.toUpperCase()
          }

          return value
        }
      },

      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
        addPath: '/locales/add/{{lng}}/{{ns}}'
      }
    })

  // eslint-disable-next-line import/no-named-as-default-member
  i18n.on('languageChanged', () => {
    const [language] = i18n.languages

    moment.locale(language)

    // Next.js doesn’t support changing <html /> properties with <Head />
    // So we’re setting it manually.
    document.documentElement.lang = language
  })
}

export default i18n
