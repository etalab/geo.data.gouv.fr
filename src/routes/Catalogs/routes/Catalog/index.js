import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

export default (store, i18n) => ({
  path: ':catalogId',

  async getComponent(nextState, cb) {
    const CatalogContainer = await import(/* webpackChunkName: 'catalogs' */ './containers/CatalogContainer')
    const catalog = await import(/* webpackChunkName: 'catalogs' */ './modules/catalog')

    injectReducer(store, {
      key: 'catalog',
      reducer: catalog.reducer
    })

    i18n.languages.forEach(async lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'Catalogs.Catalog',
        resources: await import(/* webpackMode: 'lazy-once', webpackChunkName: 'catalogs' */ `./locales/${lang}.json`)
      })
    })

    cb(null, CatalogContainer.default)
  }
})
