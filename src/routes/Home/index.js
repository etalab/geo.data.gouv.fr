import { injectLocale } from 'common/i18n/helpers'

import HomeContainer from './containers/HomeContainer'

export default (store, i18n) => {
  i18n.availableLanguages.forEach(lang => {
    injectLocale(i18n, {
      locale: lang,
      namespace: 'Home',
      resources: require(`./locales/${lang}.json`)
    })
  })

  return HomeContainer
}
