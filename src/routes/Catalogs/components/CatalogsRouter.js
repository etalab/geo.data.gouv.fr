import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import CatalogsListRoute from '../routes/CatalogsList'
import CatalogHarvestRoute from '../routes/CatalogHarvest'
import CatalogRoute from '../routes/Catalog'

const CatalogsRouter = ({ store }) => (
  <Switch>
    <Route exact path='/catalogs' render={props => (
      <CatalogsListRoute store={store} {...props} />
    )} />
    <Route path='/catalogs/:catalogId/harvest/:harvestId' render={props => (
      <CatalogHarvestRoute store={store} {...props} />
    )} />
    <Route path='/catalogs/:catalogId' render={props => (
      <CatalogRoute store={store} {...props} />
    )} />
  </Switch>
)

CatalogsRouter.propTypes = {
  store: PropTypes.object.isRequired
}

export default CatalogsRouter
