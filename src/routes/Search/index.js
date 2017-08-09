import { injectReducer } from '../../store/reducers'
import { injectLocale } from 'common/i18n/helpers'

export default (store, i18n) => ({
  path: 'search',

  async getComponent(nextState, cb) {
    const search = await import(/* webpackChunkName: 'search' */ './modules/search')
    const SearchContainer = await import(/* webpackChunkName: 'search' */ './containers/SearchContainer')

    injectReducer(store, {
      key: 'search',
      reducer: search.reducer
    })

    i18n.availableLanguages.forEach(async lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'Search',
        resources: await import(/* webpackMode: 'lazy-once', webpackChunkName: 'search' */ `./locales/${lang}.json`)
      })
    })

    cb(null, SearchContainer.default)
  },

  async onEnter({ location }) {
    const search = await import(/* webpackChunkName: 'search' */ './modules/search')

    injectReducer(store, {
      key: 'search',
      reducer: search.reducer
    })

    store.dispatch(search.actions.execute(
      search.query.parse(location.query)
    ))
  },

  onChange(oldState, newState) {
    this.onEnter(newState)
  }
})
