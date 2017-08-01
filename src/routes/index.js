import PageLayout from '../layouts/PageLayout'

import HomeRoute from './Home'
import EventsRoute from './Events'
import SearchRoute from './Search'
import CatalogsRoute from './Catalogs'
import DatasetRoute from './Dataset'

import PublicationRoute from './Publication'

import NotFoundRoute from './NotFound'

export const createRoutes = (store, i18n) => ({
  path: '/',
  component: PageLayout,
  indexRoute: HomeRoute(store, i18n),
  childRoutes: [
    EventsRoute(store, i18n),
    SearchRoute(store, i18n),
    CatalogsRoute(store, i18n),
    DatasetRoute(store, i18n),

    PublicationRoute(),

    NotFoundRoute(store, i18n)
  ]
})

export default createRoutes
