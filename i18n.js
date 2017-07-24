import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import FooterTrad from './src/components/Footer/FooterTrad.json'
import LanguageSelectionTrad from './src/components/LanguageSelection/LanguageSelectionTrad.json'
import NewsletterFormTrad from './src/components/Newsletter/NewsletterFormTrad.json'

i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        Footer: FooterTrad.en,
        LanguageSelection: LanguageSelectionTrad.en,
        NewsletterForm: NewsletterFormTrad.en
      },
      fr: {
        Footer: FooterTrad.fr,
        LanguageSelection: LanguageSelectionTrad.fr,
        NewsletterForm: NewsletterFormTrad.fr
      }
    },
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      formatSeparator: ','
    },

    react: {
      wait: true
    }
  })

export default i18n
