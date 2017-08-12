import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

import CatalogsListContainer from './containers/CatalogsListContainer'
import reducer from './modules/reducer'

export default (store, i18n) => {
  injectReducer(store, {
    key: 'catalogs',
    reducer
  })

  i18n.availableLanguages.forEach(lang => {
    injectLocale(i18n, {
      locale: lang,
      namespace: 'Catalogs.CatalogsList',
      resources: require(`./locales/${lang}.json`)
    })
  })

  return CatalogsListContainer
}
