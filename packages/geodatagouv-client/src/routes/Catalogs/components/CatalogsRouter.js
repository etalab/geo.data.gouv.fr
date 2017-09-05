import React from 'react'
import { Switch, Route } from 'react-router-dom'

import CatalogsListRoute from '../routes/CatalogsList'
import CatalogHarvestRoute from '../routes/CatalogHarvest'
import CatalogRoute from '../routes/Catalog'

const CatalogsRouter = () => (
  <Switch>
    <Route exact path='/catalogs' component={CatalogsListRoute} />
    <Route path='/catalogs/:catalogId/harvest/:harvestId' component={CatalogHarvestRoute} />
    <Route path='/catalogs/:catalogId' component={CatalogRoute} />
  </Switch>
)

export default CatalogsRouter
