import { injectLocale } from 'common/i18n/helpers'

export default (store, i18n) => ({
  path: 'events',

  async getComponent(nextState, cb) {
    const EventsContainer = await import(/* webpackChunkName: 'events' */ './containers/EventsContainer')

    i18n.availableLanguages.forEach(async lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'Events',
        resources: await import(/* webpackMode: 'lazy-once', webpackChunkName: 'events' */ `./locales/${lang}.json`)
      })
    })

    cb(null, EventsContainer.default)
  }

})
