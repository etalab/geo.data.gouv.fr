import { injectReducer } from 'common/store/reducers'

export default store => ({
  path: ':catalog/harvest/:harvest',

  async getComponent(nextState, cb) {
    const CatalogHarvestContainer = await import(/* webpackChunkName: 'catalogs' */ './containers/CatalogHarvestContainer')
    const catalog = await import(/* webpackChunkName: 'catalogs' */ '../Catalog/modules/catalog')

    injectReducer(store, {
      key: 'catalog',
      reducer: catalog.reducer
    })

    cb(null, CatalogHarvestContainer.default)
  },

  async onEnter({ params }) {
    const catalog = await import(/* webpackChunkName: 'catalogs' */ '../Catalog/modules/catalog')

    injectReducer(store, {
      key: 'catalog',
      reducer: catalog.reducer
    })

    store.dispatch(catalog.actions.get(params.catalog))
    store.dispatch(catalog.actions.getHarvest(params.catalog, params.harvest))
  }
})
