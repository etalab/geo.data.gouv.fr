import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Publication from 'common/modules/Publication/pages/Publication/Publication'
import Organization from 'common/modules/Publication/pages/Organization/Organization'
import PublishingDatasets from 'common/modules/Publication/pages/PublishingDatasets/PublishingDatasets'
import OrganizationProducers from 'common/modules/Publication/pages/OrganizationProducers/OrganizationProducers'

const PublicationRouter = () => (
  <Switch>
    <Route exact path='/publication' component={Publication} />
    <Route path='/publication/:organizationId/datasets' component={PublishingDatasets} />
    <Route path='/publication/:organizationId/producers' component={OrganizationProducers} />
    <Route path='/publication/:organizationId' component={Organization} />
  </Switch>
)

export default PublicationRouter
