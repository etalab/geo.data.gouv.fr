import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// import CatalogsListPageTrad from '../routes/Catalogs/routes/CatalogsList/components/CatalogsListPage/CatalogsListPageTrad.json'
// import NotFoundPageTrad from '../routes/NotFound/components/NotFoundPage/NotFoundPageTrad.json'

export default () => i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        Common: require('../locales/en.json')
      },
      fr: {
        Common: require('../locales/fr.json')
      },
    // en: {
    //   CatalogsListPage: CatalogsListPageTrad.en,
    //   HomePage: HomePageTrad.en,
    //   NotFoundPage: NotFoundPageTrad.en,
    // },
    // fr: {
    //     CatalogsListPage: CatalogsListPageTrad.fr,
    //     HomePage: HomePageTrad.fr,
    //     NotFoundPage: NotFoundPageTrad.fr,
    //   }
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
