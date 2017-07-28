import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

export default (store, i18n) => ({
  path: ':catalog/harvest/:harvest',

  async getComponent(nextState, cb) {
    const CatalogHarvestContainer = await import(/* webpackChunkName: 'catalogs' */ './containers/CatalogHarvestContainer')
    const catalog = await import(/* webpackChunkName: 'catalogs' */ '../Catalog/modules/catalog')

    injectReducer(store, {
      key: 'catalog',
      reducer: catalog.reducer
    })

    i18n.languages.forEach(async lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'Catalogs.CatalogHarvest',
        resources: await import(/* webpackMode: 'lazy-once', webpackChunkName: 'catalogs' */ `./locales/${lang}.json`)
      })
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
