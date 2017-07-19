import CatalogsListRoute from './routes/CatalogsList'
import CatalogRoute from './routes/Catalog'

export default store => ({
  path: 'catalogs',

  indexRoute: CatalogsListRoute(store),
  childRoutes: [
    CatalogRoute(store)
  ]
})
