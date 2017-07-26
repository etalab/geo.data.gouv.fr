import { injectReducer } from 'common/store/reducers'

export default (store, i18n) => ({
  path: ':catalogId',

  async getComponent(nextState, cb) {
    const CatalogContainer = await import(/* webpackChunkName: 'catalogs' */ './containers/CatalogContainer')
    const catalog = await import(/* webpackChunkName: 'catalogs' */ './modules/catalog')

    injectReducer(store, {
      key: 'catalog',
      reducer: catalog.reducer
    })

    cb(null, CatalogContainer.default)
  },

  async onEnter({ params }) {
    const catalog = await import(/* webpackChunkName: 'catalogs' */ './modules/catalog')

    injectReducer(store, {
      key: 'catalog',
      reducer: catalog.reducer
    })

    store.dispatch(catalog.actions.get(params.catalog))
    store.dispatch(catalog.actions.getMetrics(params.catalog))
  }
})
