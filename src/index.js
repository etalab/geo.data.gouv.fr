import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import moment from 'moment'

import WrappedDatasets from './components/Dataset/WrappedDatasets'
import App from './components/App/App'
import Home from './components/Home/Home'
import DatasetDetail from './components/Dataset/DatasetDetail'
import NotFound from './components/NotFound/NotFound'

import Catalogs from './modules/Catalogs/pages/Catalogs/Catalogs'
import CatalogDetail from './modules/Catalogs/pages/CatalogDetail/CatalogDetail'
import HarvestDetail from './modules/Catalogs/pages/HarvestDetail/HarvestDetail'

import Publication from './modules/Publication/pages/Publication/Publication'
import Organization from './modules/Publication/pages/Organization/Organization'
import PublishingDatasets from './modules/Publication/pages/PublishingDatasets/PublishingDatasets'

moment.locale('fr')

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/publication" component={Publication} />
      <Route path="/publication/:organizationId" component={Organization} />
      <Route path="/publication/:organizationId/datasets" component={PublishingDatasets} />
      <Route path="/catalogs" component={Catalogs} />
      <Route path="/catalogs/:catalogId" component={CatalogDetail} />
      <Route path="/catalogs/:catalogId/harvest/:harvestId" component={HarvestDetail} />
      <Route path="/datasets" component={WrappedDatasets} />
      <Route path="/datasets/:datasetId" component={DatasetDetail} />
      <Route path="/records" component={WrappedDatasets} />
      <Route path="/records/:recordId" component={DatasetDetail} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
