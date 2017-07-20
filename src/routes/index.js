import PageLayout from '../layouts/PageLayout'

import HomeRoute from './Home'
import EventsRoute from './Events'
import SearchRoute from './Search'
import CatalogsRoute from './Catalogs'

import DatasetsRoute from './Datasets'
import PublicationRoute from './Publication'

import NotFoundRoute from './NotFound'

export const createRoutes = store => ({
  path: '/',
  component: PageLayout,
  indexRoute: HomeRoute(store),
  childRoutes: [
    EventsRoute(store),
    SearchRoute(store),
    CatalogsRoute(store),

    DatasetsRoute(),
    PublicationRoute(),

    NotFoundRoute
  ]
})

export default createRoutes
