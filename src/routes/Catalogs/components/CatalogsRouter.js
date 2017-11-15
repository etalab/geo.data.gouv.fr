import React from 'react'
import { Switch, Route } from 'react-router-dom'

import CatalogHarvestRoute from '../routes/CatalogHarvest'

const CatalogsRouter = () => (
  <Switch>
    <Route path='/catalogs/:catalogId/harvest/:harvestId' component={CatalogHarvestRoute} />
  </Switch>
)

export default CatalogsRouter
