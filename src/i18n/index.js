import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// import CatalogFacetsListTrad from '../routes/Catalogs/routes/Catalog/components/CatalogFacetsList/CatalogFacetsListTrad.json'
// import CatalogHarvestsRowTrad from '../routes/Catalogs/routes/Catalog/components/CatalogHarvestsRow/CatalogHarvestsRowTrad.json'
// import CatalogHarvestsTableTrad from '../routes/Catalogs/routes/Catalog/components/CatalogHarvestsTable/CatalogHarvestsTableTrad.json'
// import CatalogHarvestViewTrad from '../routes/Catalogs/routes/CatalogHarvest/components/CatalogHarvestView/CatalogHarvestViewTrad.json'
// import CatalogHarvestsViewTrad from '../routes/Catalogs/routes/Catalog/components/CatalogHarvestsView/CatalogHarvestsViewTrad.json'
// import CatalogsListPageTrad from '../routes/Catalogs/routes/CatalogsList/components/CatalogsListPage/CatalogsListPageTrad.json'
// import CatalogStatisticsTrad from '../routes/Catalogs/routes/Catalog/components/CatalogStatistics/CatalogStatisticsTrad.json'
// import CatalogViewTrad from '../routes/Catalogs/routes/Catalog/components/CatalogView/CatalogViewTrad.json'
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
    //   CatalogFacetsList: CatalogFacetsListTrad.en,
    //   CatalogHarvestsRow: CatalogHarvestsRowTrad.en,
    //   CatalogHarvestsTable: CatalogHarvestsTableTrad.en,
    //   CatalogHarvestView: CatalogHarvestViewTrad.en,
    //   CatalogHarvestsView: CatalogHarvestsViewTrad.en,
    //   CatalogsListPage: CatalogsListPageTrad.en,
    //   CatalogStatistics: CatalogStatisticsTrad.en,
    //   CatalogView: CatalogViewTrad.en,
    //   HomePage: HomePageTrad.en,
    //   NotFoundPage: NotFoundPageTrad.en,
    // },
    // fr: {
    //     CatalogFacetsList: CatalogFacetsListTrad.fr,
    //     CatalogHarvestsRow: CatalogHarvestsRowTrad.fr,
    //     CatalogHarvestsTable: CatalogHarvestsTableTrad.fr,
    //     CatalogHarvestView: CatalogHarvestViewTrad.fr,
    //     CatalogHarvestsView: CatalogHarvestsViewTrad.fr,
    //     CatalogsListPage: CatalogsListPageTrad.fr,
    //     CatalogStatistics: CatalogStatisticsTrad.fr,
    //     CatalogView: CatalogViewTrad.fr,
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
