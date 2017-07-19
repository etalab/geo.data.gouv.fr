import { injectReducer } from 'common/store/reducers'

export default store => ({
  path: ':id',

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
    const actions = await import(/* webpackChunkName: 'catalogs' */ './modules/actions')

    store.dispatch(actions.get(params.id))
    store.dispatch(actions.getMetrics(params.id))
  }
})
