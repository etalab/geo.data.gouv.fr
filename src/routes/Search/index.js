import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

import asyncRoute from '../asyncRoute'

export default (store, i18n) => asyncRoute(async () => {
  injectReducer(store, {
    key: 'search',
    reducer: (await import(/* webpackChunkName: 'search' */ './modules/reducer')).default
  })

  i18n.availableLanguages.forEach(async lang => {
    injectLocale(i18n, {
      locale: lang,
      namespace: 'Search',
      resources: await import(/* webpackMode: 'lazy-once', webpackChunkName: 'search' */ `./locales/${lang}.json`)
    })
  })

  return import(/* webpackChunkName: 'search' */ './containers/SearchContainer')
})
