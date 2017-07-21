import CatalogsListRoute from './routes/CatalogsList'
import CatalogRoute from './routes/Catalog'
import CatalogHarvestRoute from './routes/CatalogHarvest'

export default store => ({
  path: 'catalogs',

  indexRoute: CatalogsListRoute(store),
  childRoutes: [
    CatalogRoute(store),
    CatalogHarvestRoute(store)
  ]
})
