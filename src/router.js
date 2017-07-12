import React from 'react'
import { Router, Route, Redirect, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router'

import { useScroll } from 'react-router-scroll'

import App from './components/App/App'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'

import Catalogs from './modules/Catalogs/pages/Catalogs/Catalogs'
import CatalogDetail from './modules/Catalogs/pages/CatalogDetail/CatalogDetail'
import HarvestDetail from './modules/Catalogs/pages/HarvestDetail/HarvestDetail'

import Publication from './modules/Publication/pages/Publication/Publication'
import Organization from './modules/Publication/pages/Organization/Organization'
import PublishingDatasets from './modules/Publication/pages/PublishingDatasets/PublishingDatasets'
import OrganizationProducers from './modules/Publication/pages/OrganizationProducers/OrganizationProducers'

import Events from './modules/Events/pages/Events/Events'

import WrappedDatasets from './modules/Datasets/pages/WrappedDatasets/WrappedDatasets'
import DatasetDetailLoader from './modules/Datasets/pages/DatasetDetail/DatasetDetailLoader'

export default () => (
  <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/publication" component={Publication} />
      <Route path="/publication/:organizationId" component={Organization} />
      <Route path="/publication/:organizationId/datasets" component={PublishingDatasets} />
      <Route path="/publication/:organizationId/producers" component={OrganizationProducers} />
      <Route path="/catalogs" component={Catalogs} />
      <Route path="/catalogs/:catalogId" component={CatalogDetail} />
      <Route path="/catalogs/:catalogId/harvest/:harvestId" component={HarvestDetail} />
      <Route path="/search" component={WrappedDatasets} />
      <Redirect from="/datasets" to="/search" />
      <Route path="/datasets/:datasetId" component={DatasetDetailLoader} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)
