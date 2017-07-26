import CatalogsListRoute from './routes/CatalogsList'
import CatalogRoute from './routes/Catalog'
import CatalogHarvestRoute from './routes/CatalogHarvest'

export default (store, i18n) => ({
  path: 'catalogs',

  indexRoute: CatalogsListRoute(store, i18n),
  childRoutes: [
    CatalogRoute(store, i18n),
    CatalogHarvestRoute(store, i18n)
  ]
})
