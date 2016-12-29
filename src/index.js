import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import moment from 'moment'
import Publication from './components/Publication/Publication'
import PublishingDatasets from './components/Publication/PublishingDatasets'
import HarvestDetail from './components/Harvest/HarvestDetail'
import WrappedDatasets from './components/Dataset/WrappedDatasets'
import App from './components/App/App'
import Home from './components/Home/Home'
import Catalogs from './components/Catalogs/Catalogs'
import CatalogDetail from './components/CatalogDetail/CatalogDetail'
import DatasetDetail from './components/Dataset/DatasetDetail'
import HealthDetails from './components/Health/HealthDetails'
import NotFound from './components/NotFound/NotFound'

moment.locale('fr')

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/publication" component={Publication} />
      <Route path="/publication/:organizationId/datasets" component={PublishingDatasets} />
      <Route path="/catalogs" component={Catalogs} />
      <Route path="/catalogs/:catalogId" component={CatalogDetail} />
      <Route path="/catalogs/:catalogId/health" component={HealthDetails} />
      <Route path="/catalogs/:catalogId/harvest/:harvestId" component={HarvestDetail} />
      <Route path="/datasets" component={WrappedDatasets} />
      <Route path="/datasets/:datasetId" component={DatasetDetail} />
      <Route path="/records" component={WrappedDatasets} />
      <Route path="/records/:recordId" component={DatasetDetail} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
