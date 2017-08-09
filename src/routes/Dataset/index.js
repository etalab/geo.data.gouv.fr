import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

import asyncRoute from '../asyncRoute'

export default (store, i18n) => asyncRoute(async () => {
  injectReducer(store, {
    key: 'dataset',
    reducer: (await import(/* webpackChunkName: 'dataset' */ './modules/reducer')).default
  })

  i18n.availableLanguages.forEach(async lang => {
    injectLocale(i18n, {
      locale: lang,
      namespace: 'Dataset',
      resources: await import(/* webpackMode: 'lazy-once', webpackChunkName: 'dataset' */ `./locales/${lang}.json`)
    })
  })

  return import(/* webpackChunkName: 'dataset' */ './containers/DatasetContainer')
})
