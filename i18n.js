import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import CatalogPreviewTrad from './src/components/catalogPreview/CatalogPreviewTrad.json'
import FooterTrad from './src/components/Footer/FooterTrad.json'
import HeaderTrad from './src/components/Header/HeaderTrad.json'
import HomePageTrad from './src/routes/Home/components/HomePage/HomePageTrad.json'
import LanguageSelectionTrad from './src/components/LanguageSelection/LanguageSelectionTrad.json'
import LastHarvestStatusTrad from './src/components/LastHarvestStatus/LastHarvestStatusTrad.json'
import NewsletterFormTrad from './src/components/Newsletter/NewsletterFormTrad.json'
import NotFoundPageTrad from './src/routes/NotFound/components/NotFoundPage/NotFoundPageTrad.json'
import SearchInputTrad from './src/components/SearchInput/SearchInputTrad.json'

i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        CatalogPreview: CatalogPreviewTrad.en,
        Footer: FooterTrad.en,
        Header: HeaderTrad.en,
        HomePage: HomePageTrad.en,
        LanguageSelection: LanguageSelectionTrad.en,
        LastHarvestStatus: LastHarvestStatusTrad.en,
        NewsletterForm: NewsletterFormTrad.en,
        NotFoundPage: NotFoundPageTrad.en,
        SearchInput: SearchInputTrad.en
      },
      fr: {
        CatalogPreview: CatalogPreviewTrad.fr,
        Footer: FooterTrad.fr,
        Header: HeaderTrad.fr,
        HomePage: HomePageTrad.fr,
        LanguageSelection: LanguageSelectionTrad.fr,
        LastHarvestStatus: LastHarvestStatusTrad.fr,
        NewsletterForm: NewsletterFormTrad.fr,
        NotFoundPage: NotFoundPageTrad.fr,
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
