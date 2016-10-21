import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import HarvestDetail from './components/Section/HarvestsSection/HarvestDetail/HarvestDetail'
import './index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import App from './components/App/App'
import Home from './components/Home/Home'
import Catalogs from './components/Catalogs/Catalogs'
import CatalogDetail from './components/CatalogDetail/CatalogDetail'
import NotFind from './components/NotFind/NotFind'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/catalogs" component={Catalogs} />
      <Route path="/catalogs/:catalogId" component={CatalogDetail} />
      <Route path="/catalogs/:catalogId/harvest/:harvestId" component={HarvestDetail} />
      <Route path="*" component={NotFind} />
    </Route>
  </Router>
), document.getElementById('root'))
