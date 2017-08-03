export default () => ({
  path: 'publication',

  indexRoute: {
    async getComponent(nextState, cb) {
      const Publication = await import(
        /* webpackChunkName: 'publication' */
        'common/modules/Publication/pages/Publication/Publication'
      )

      cb(null, Publication.default)
    }
  },

  childRoutes: [
    {
      path: ':organizationId',
      async getComponent(nextState, cb) {
        const Organization = await import(
          /* webpackChunkName: 'publication' */
          'common/modules/Publication/pages/Organization/Organization'
        )

        cb(null, Organization.default)
      }
    },
    {
      path: ':organizationId/datasets',
      async getComponent(nextState, cb) {
        const PublishingDatasets = await import(
          /* webpackChunkName: 'publication' */
          'common/modules/Publication/pages/PublishingDatasets/PublishingDatasets'
        )

        cb(null, PublishingDatasets.default)
      }
    },
    {
      path: ':organizationId/producers',
      async getComponent(nextState, cb) {
        const OrganizationProducers = await import(
          /* webpackChunkName: 'publication' */
          'common/modules/Publication/pages/OrganizationProducers/OrganizationProducers'
        )

        cb(null, OrganizationProducers.default)
      }
    }
  ]
})
