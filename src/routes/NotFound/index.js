import { injectLocale } from 'common/i18n/helpers'

import NotFoundPage from './components/NotFoundPage'

export default (store, i18n) => {
  i18n.availableLanguages.forEach(lang => {
    injectLocale(i18n, {
      locale: lang,
      namespace: 'NotFound',
      resources: require(`./locales/${lang}.json`)
    })
  })

  return NotFoundPage
}
