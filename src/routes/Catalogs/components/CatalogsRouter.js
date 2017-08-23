import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import CatalogsListRoute from '../routes/CatalogsList'
import CatalogHarvestRoute from '../routes/CatalogHarvest'
import CatalogRoute from '../routes/Catalog'

const CatalogsRouter = ({ store, i18n }) => (
  <Switch>
    <Route exact path='/catalogs' render={props => (
      <CatalogsListRoute store={store} i18n={i18n} {...props} />
    )} />
    <Route path='/catalogs/:catalogId/harvest/:harvestId' render={props => (
      <CatalogHarvestRoute store={store} i18n={i18n} {...props} />
    )} />
    <Route path='/catalogs/:catalogId' render={props => (
      <CatalogRoute store={store} i18n={i18n} {...props} />
    )} />
  </Switch>
)

CatalogsRouter.propTypes = {
  store: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired
}

export default CatalogsRouter
