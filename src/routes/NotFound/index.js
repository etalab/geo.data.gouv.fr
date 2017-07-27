import { injectLocale } from 'common/i18n/helpers'

import NotFoundPage from './components/NotFoundPage'

export default (store, i18n) => ({
  path: '*',

  getComponent(nextState, cb) {
    i18n.languages.forEach(lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'NotFound',
        resources: require(`./locales/${lang}.json`)
      })
    })

    cb(null, NotFoundPage)
  }
})
