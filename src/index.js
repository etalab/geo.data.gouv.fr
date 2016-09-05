import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './App/App'
import CatalogDetail from './CatalogDetail/CatalogDetail'
import NotFind from './NotFind/NotFind'
import './index.css'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="Home" component={App} />
    <Route path="Catalog" component={App} />
    <Route path="/:id" component={CatalogDetail} />
    <Route path="*" component={NotFind}/>
  </Router>
), document.getElementById('root'))
