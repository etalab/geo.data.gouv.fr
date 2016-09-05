import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import App from './App/App'
import CatalogDetail from './CatalogDetail/CatalogDetail'
import NotFind from './NotFind/NotFind'
import './index.css'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/dashboard" />
      <Route path="dashboard" component={App} />
    </Route>
    <Route path="catalog/:id" component={CatalogDetail} />
    <Route path="*" component={NotFind}/>
  </Router>
), document.getElementById('root'))
