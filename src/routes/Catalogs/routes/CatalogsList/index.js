import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

export default (store, i18n) => ({
  async getComponent(nextState, cb) {
    const CatalogsListContainer = await import(/* webpackChunkName: 'catalogs' */ './containers/CatalogsListContainer')
    const catalogs = await import(/* webpackChunkName: 'catalogs' */ './modules/catalogs')

    injectReducer(store, {
      key: 'catalogs',
      reducer: catalogs.reducer
    })

    i18n.availableLanguages.forEach(async lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'Catalogs.CatalogsList',
        resources: await import(/* webpackMode: 'lazy-once', webpackChunkName: 'catalogs' */ `./locales/${lang}.json`)
      })
    })

    cb(null, CatalogsListContainer.default)
  },

  async onEnter() {
    const catalogs = await import(/* webpackChunkName: 'catalogs' */ './modules/catalogs')

    injectReducer(store, {
      key: 'catalogs',
      reducer: catalogs.reducer
    })

    store.dispatch(catalogs.actions.list())
  }
})
