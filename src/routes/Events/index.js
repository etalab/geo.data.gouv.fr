import { injectLocale } from 'common/i18n/helpers'

import asyncRoute from '../asyncRoute'

export default (store, i18n) => asyncRoute(async () => {
  i18n.availableLanguages.forEach(async lang => {
    injectLocale(i18n, {
      locale: lang,
      namespace: 'Events',
      resources: await import(/* webpackMode: 'lazy-once', webpackChunkName: 'events' */ `./locales/${lang}.json`)
    })
  })

  return import(/* webpackChunkName: 'events' */ './containers/EventsContainer')
})
