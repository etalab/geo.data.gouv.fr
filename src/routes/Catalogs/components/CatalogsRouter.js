import React from 'react'
import { Switch, Route } from 'react-router-dom'

import CatalogsListRoute from '../routes/CatalogsList'
import CatalogRoute from '../routes/Catalog'
import CatalogHarvestRoute from '../routes/CatalogHarvest'

const CatalogsRouter = (store, i18n) => () => (
  <Switch>
    <Route exact path='/catalogs' component={CatalogsListRoute(store, i18n)} />
    <Route path='/catalogs/:catalogId/harvest/:harvestId' component={CatalogHarvestRoute(store, i18n)} />
    <Route path='/catalogs/:catalogId' component={CatalogRoute(store, i18n)} />
  </Switch>
)

export default CatalogsRouter
