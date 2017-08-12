import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

import CatalogHarvestContainer from './containers/CatalogHarvestContainer'
import reducer from '../Catalog/modules/reducer'

export default (store, i18n) => {
  injectReducer(store, {
    key: 'catalog',
    reducer
  })

  i18n.availableLanguages.forEach(lang => {
    injectLocale(i18n, {
      locale: lang,
      namespace: 'Catalogs.CatalogHarvest',
      resources: require(`./locales/${lang}.json`)
    })
  })

  return CatalogHarvestContainer
}
