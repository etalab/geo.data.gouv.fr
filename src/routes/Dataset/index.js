import { injectReducer } from 'common/store/reducers'

export default (store) => ({
  path: 'datasets/:datasetId',

  async getComponent(nextState, cb) {
    const DatasetContainer = await import(/* webpackChunkName: 'dataset' */ './containers/DatasetContainer')
    const dataset = await import(/* webpackChunkName: 'dataset' */ './modules/dataset')

    injectReducer(store, {
      key: 'dataset',
      reducer: dataset.reducer
    })

    cb(null, DatasetContainer.default)
  }
})
