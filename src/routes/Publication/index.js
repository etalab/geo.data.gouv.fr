import Publication from 'common/modules/Publication/pages/Publication/Publication'
import Organization from 'common/modules/Publication/pages/Organization/Organization'
import PublishingDatasets from 'common/modules/Publication/pages/PublishingDatasets/PublishingDatasets'
import OrganizationProducers from 'common/modules/Publication/pages/OrganizationProducers/OrganizationProducers'

export default () => ({
  path: 'publication',

  indexRoute: {
    component: Publication
  },

  childRoutes: [
    {
      path: ':organizationId',
      component: Organization
    },
    {
      path: ':organizationId/datasets',
      component: PublishingDatasets
    },
    {
      path: ':organizationId/producers',
      component: OrganizationProducers
    }
  ]
})
