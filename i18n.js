import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import FooterTrad from './src/components/Footer/FooterTrad.json'
import HomePageTrad from './src/routes/Home/components/HomePage/HomePageTrad.json'
import LanguageSelectionTrad from './src/components/LanguageSelection/LanguageSelectionTrad.json'
import NewsletterFormTrad from './src/components/Newsletter/NewsletterFormTrad.json'
import SearchInputTrad from './src/components/SearchInput/SearchInputTrad.json'

i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        Footer: FooterTrad.en,
        HomePage: HomePageTrad.en,
        LanguageSelection: LanguageSelectionTrad.en,
        NewsletterForm: NewsletterFormTrad.en,
        SearchInput: SearchInputTrad.en
      },
      fr: {
        Footer: FooterTrad.fr,
        HomePage: HomePageTrad.fr,
        LanguageSelection: LanguageSelectionTrad.fr,
        SearchInput: SearchInputTrad.fr
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
