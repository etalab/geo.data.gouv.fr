import DatasetDetailLoader from 'common/modules/Datasets/pages/DatasetDetail/DatasetDetailLoader'


export default () => ({
  path: 'datasets',

  childRoutes: [
    {
      path: ':datasetId',
      component: DatasetDetailLoader
    }
  ]
})
