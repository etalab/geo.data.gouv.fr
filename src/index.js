import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App/App'
import Home from './Home/Home'
import Catalogs from './Catalogs/Catalogs'
import CatalogDetail from './CatalogDetail/CatalogDetail'
import NotFind from './NotFind/NotFind'
import './index.css'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="catalogs" component={Catalogs} />
      <Route path="catalog/:id" component={CatalogDetail} />
      <Route path="*" component={NotFind} />
    </Route>
  </Router>
), document.getElementById('root'))
