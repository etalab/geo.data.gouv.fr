import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// import CatalogFacetsListTrad from '../routes/Catalogs/routes/Catalog/components/CatalogFacetsList/CatalogFacetsListTrad.json'
// import CatalogHarvestsRowTrad from '../routes/Catalogs/routes/Catalog/components/CatalogHarvestsRow/CatalogHarvestsRowTrad.json'
// import CatalogHarvestsTableTrad from '../routes/Catalogs/routes/Catalog/components/CatalogHarvestsTable/CatalogHarvestsTableTrad.json'
// import CatalogHarvestViewTrad from '../routes/Catalogs/routes/CatalogHarvest/components/CatalogHarvestView/CatalogHarvestViewTrad.json'
// import CatalogHarvestsViewTrad from '../routes/Catalogs/routes/Catalog/components/CatalogHarvestsView/CatalogHarvestsViewTrad.json'
// import CatalogPreviewTrad from '../components/CatalogPreview/CatalogPreviewTrad.json'
// import CatalogsListPageTrad from '../routes/Catalogs/routes/CatalogsList/components/CatalogsListPage/CatalogsListPageTrad.json'
// import CatalogStatisticsTrad from '../routes/Catalogs/routes/Catalog/components/CatalogStatistics/CatalogStatisticsTrad.json'
// import CatalogViewTrad from '../routes/Catalogs/routes/Catalog/components/CatalogView/CatalogViewTrad.json'
// import DoughnutChartTrad from '../components/Charts/DoughnutChart/DoughnutChartTrad.json'
// import FooterTrad from '../components/Footer/FooterTrad.json'
// import HeaderTrad from '../components/Header/HeaderTrad.json'
// import HistogramTrad from '../components/Charts/Histogram/HistogramTrad.json'
// import LanguageSelectionTrad from '../components/LanguageSelection/LanguageSelectionTrad.json'
// import LastHarvestStatusTrad from '../components/LastHarvestStatus/LastHarvestStatusTrad.json'
// import ObsoleteWarningTrad from '../components/CatalogPreview/ObsoleteWarningTrad.json'
// import NewsletterFormTrad from '../components/Newsletter/NewsletterFormTrad.json'
// import NotFoundPageTrad from '../routes/NotFound/components/NotFoundPage/NotFoundPageTrad.json'
// import SearchInputTrad from '../components/SearchInput/SearchInputTrad.json'

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
    //   CatalogPreview: CatalogPreviewTrad.en,
    //   CatalogsListPage: CatalogsListPageTrad.en,
    //   CatalogStatistics: CatalogStatisticsTrad.en,
    //   CatalogView: CatalogViewTrad.en,
    //   DoughnutChart: DoughnutChartTrad.en,
    //   Footer: FooterTrad.en,
    //   Header: HeaderTrad.en,
    //   Histogram: HistogramTrad.en,
    //   HomePage: HomePageTrad.en,
    //   LanguageSelection: LanguageSelectionTrad.en,
    //   LastHarvestStatus: LastHarvestStatusTrad.en,
    //   ObsoleteWarning: ObsoleteWarningTrad.en,
    //   NewsletterForm: NewsletterFormTrad.en,
    //   NotFoundPage: NotFoundPageTrad.en,
    //   SearchInput: SearchInputTrad.en
    // },
    // fr: {
    //     CatalogFacetsList: CatalogFacetsListTrad.fr,
    //     CatalogHarvestsRow: CatalogHarvestsRowTrad.fr,
    //     CatalogHarvestsTable: CatalogHarvestsTableTrad.fr,
    //     CatalogHarvestView: CatalogHarvestViewTrad.fr,
    //     CatalogHarvestsView: CatalogHarvestsViewTrad.fr,
    //     CatalogPreview: CatalogPreviewTrad.fr,
    //     CatalogsListPage: CatalogsListPageTrad.fr,
    //     CatalogStatistics: CatalogStatisticsTrad.fr,
    //     CatalogView: CatalogViewTrad.fr,
    //     DoughnutChart: DoughnutChartTrad.fr,
    //     Footer: FooterTrad.fr,
    //     Header: HeaderTrad.fr,
    //     Histogram: HistogramTrad.fr,
    //     HomePage: HomePageTrad.fr,
    //     LanguageSelection: LanguageSelectionTrad.fr,
    //     LastHarvestStatus: LastHarvestStatusTrad.fr,
    //     ObsoleteWarning: ObsoleteWarningTrad.fr,
    //     NewsletterForm: NewsletterFormTrad.fr,
    //     NotFoundPage: NotFoundPageTrad.fr,
    //     SearchInput: SearchInputTrad.fr
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
