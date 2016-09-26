import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import HarvestDetail from './Section/HarvestsSection/HarvestDetail/HarvestDetail'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import App from './App/App'
import Home from './Home/Home'
import Catalogs from './Catalogs/Catalogs'
import CatalogDetail from './CatalogDetail/CatalogDetail'
import NotFind from './NotFind/NotFind'

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
