import PageLayout from '../layouts/PageLayout'

import HomeRoute from './Home'
import EventsRoute from './Events'
import SearchRoute from './Search'
import CatalogsRoute from './Catalogs'

import NotFoundRoute from './NotFound'

export const createRoutes = store => ({
  path: '/',
  component: PageLayout,
  indexRoute: HomeRoute(store),
  childRoutes: [
    EventsRoute(store),
    SearchRoute(store),
    CatalogsRoute(store),

    NotFoundRoute
  ]
})

export default createRoutes
