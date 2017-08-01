import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

export default (store, i18n) => ({
  path: 'datasets/:datasetId',

  async getComponent(nextState, cb) {
    const DatasetContainer = await import(/* webpackChunkName: 'dataset' */ './containers/DatasetContainer')
    const dataset = await import(/* webpackChunkName: 'dataset' */ './modules/dataset')

    injectReducer(store, {
      key: 'dataset',
      reducer: dataset.reducer
    })

    i18n.languages.forEach(async lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'Dataset',
        resources: await import(/* webpackMode: 'lazy-once', webpackChunkName: 'catalogs' */ `./locales/${lang}.json`)
      })
    })

    cb(null, DatasetContainer.default)
  }
})
