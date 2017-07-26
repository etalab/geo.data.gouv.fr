import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import CatalogFacetsListTrad from './src/routes/Catalogs/routes/Catalog/components/CatalogFacetsList/CatalogFacetsListTrad.json'
import CatalogHarvestsRowTrad from './src/routes/Catalogs/routes/Catalog/components/CatalogHarvestsRow/CatalogHarvestsRowTrad.json'
import CatalogHarvestsTableTrad from './src/routes/Catalogs/routes/Catalog/components/CatalogHarvestsTable/CatalogHarvestsTableTrad.json'
import CatalogHarvestViewTrad from './src/routes/Catalogs/routes/CatalogHarvest/components/CatalogHarvestView/CatalogHarvestViewTrad.json'
import CatalogHarvestsViewTrad from './src/routes/Catalogs/routes/Catalog/components/CatalogHarvestsView/CatalogHarvestsViewTrad.json'
import CatalogPreviewTrad from './src/components/CatalogPreview/CatalogPreviewTrad.json'
import CatalogsListPageTrad from './src/routes/Catalogs/routes/CatalogsList/components/CatalogsListPage/CatalogsListPageTrad.json'
import CatalogStatisticsTrad from './src/routes/Catalogs/routes/Catalog/components/CatalogStatistics/CatalogStatisticsTrad.json'
import CatalogViewTrad from './src/routes/Catalogs/routes/Catalog/components/CatalogView/CatalogViewTrad.json'
import DoughnutChartTrad from './src/components/Charts/DoughnutChart/DoughnutChartTrad.json'
import FooterTrad from './src/components/Footer/FooterTrad.json'
import HeaderTrad from './src/components/Header/HeaderTrad.json'
import HistogramTrad from './src/components/Charts/Histogram/HistogramTrad.json'
import HomePageTrad from './src/routes/Home/components/HomePage/HomePageTrad.json'
import LanguageSelectionTrad from './src/components/LanguageSelection/LanguageSelectionTrad.json'
import LastHarvestStatusTrad from './src/components/LastHarvestStatus/LastHarvestStatusTrad.json'
import ObsoleteWarningTrad from './src/components/CatalogPreview/ObsoleteWarningTrad.json'
import NewsletterFormTrad from './src/components/Newsletter/NewsletterFormTrad.json'
import NotFoundPageTrad from './src/routes/NotFound/components/NotFoundPage/NotFoundPageTrad.json'
import SearchInputTrad from './src/components/SearchInput/SearchInputTrad.json'

i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        CatalogFacetsList: CatalogFacetsListTrad.en,
        CatalogHarvestsRow: CatalogHarvestsRowTrad.en,
        CatalogHarvestsTable: CatalogHarvestsTableTrad.en,
        CatalogHarvestView: CatalogHarvestViewTrad.en,
        CatalogHarvestsView: CatalogHarvestsViewTrad.en,
        CatalogPreview: CatalogPreviewTrad.en,
        CatalogsListPage: CatalogsListPageTrad.en,
        CatalogStatistics: CatalogStatisticsTrad.en,
        CatalogView: CatalogViewTrad.en,
        DoughnutChart: DoughnutChartTrad.en,
        Footer: FooterTrad.en,
        Header: HeaderTrad.en,
        Histogram: HistogramTrad.en,
        HomePage: HomePageTrad.en,
        LanguageSelection: LanguageSelectionTrad.en,
        LastHarvestStatus: LastHarvestStatusTrad.en,
        ObsoleteWarning: ObsoleteWarningTrad.en,
        NewsletterForm: NewsletterFormTrad.en,
        NotFoundPage: NotFoundPageTrad.en,
        SearchInput: SearchInputTrad.en
      },
      fr: {
        CatalogFacetsList: CatalogFacetsListTrad.fr,
        CatalogHarvestsRow: CatalogHarvestsRowTrad.fr,
        CatalogHarvestsTable: CatalogHarvestsTableTrad.fr,
        CatalogHarvestView: CatalogHarvestViewTrad.fr,
        CatalogHarvestsView: CatalogHarvestsViewTrad.fr,
        CatalogPreview: CatalogPreviewTrad.fr,
        CatalogsListPage: CatalogsListPageTrad.fr,
        CatalogStatistics: CatalogStatisticsTrad.fr,
        CatalogView: CatalogViewTrad.fr,
        DoughnutChart: DoughnutChartTrad.fr,
        Footer: FooterTrad.fr,
        Header: HeaderTrad.fr,
        Histogram: HistogramTrad.fr,
        HomePage: HomePageTrad.fr,
        LanguageSelection: LanguageSelectionTrad.fr,
        LastHarvestStatus: LastHarvestStatusTrad.fr,
        ObsoleteWarning: ObsoleteWarningTrad.fr,
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
