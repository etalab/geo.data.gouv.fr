import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router'
import moment from 'moment'
import createPiwikConnector from 'piwik-react-router'

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
import DatasetDetail from './modules/Datasets/pages/DatasetDetail/DatasetDetail'

moment.locale('fr')

// Piwik
createPiwikConnector({
  url: 'https://stats.data.gouv.fr',
  siteId: 32
}).connectToHistory(browserHistory);

ReactDOM.render((
  <Router history={browserHistory}>
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
      <Route path="/datasets/:datasetId" component={DatasetDetail} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
