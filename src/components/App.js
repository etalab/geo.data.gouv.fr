import React from 'react'

import { Switch, Route } from 'react-router-dom'

import PageLayout from './PageLayout'
import ScrollToTop from './ScrollToTop'
import TrackPageViews from './TrackPageViews'

import HomeRoute from '../routes/Home'
import SearchRoute from '../routes/Search'
import DatasetRoute from '../routes/Dataset'
import CatalogRoute from '../routes/Catalogs'
import EventsRoute from '../routes/Events'
import PublicationRoute from '../routes/Publication'

import NotFoundRoute from '../routes/NotFound'

import '../styles/global.scss'

const App = () => (
  <PageLayout>
    <ScrollToTop />
    <TrackPageViews />

    <Switch>
      <Route exact path='/' component={HomeRoute} />
      <Route path='/search' component={SearchRoute} />
      <Route path='/datasets/:datasetId' component={DatasetRoute} />
      <Route path='/catalogs' component={CatalogRoute} />
      <Route path='/events' component={EventsRoute} />
      <Route path='/publication' component={PublicationRoute} />

      <Route component={NotFoundRoute} />
    </Switch>
  </PageLayout>
)

export default App
