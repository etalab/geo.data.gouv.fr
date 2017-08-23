import withReducer from 'common/store/withReducer'
import withLocales from 'common/i18n/withLocales'

import CatalogContainer from './containers/CatalogContainer'
import reducer from './modules/reducer'

export default withReducer('catalog', reducer)(
  withLocales(
    'Catalogs.Catalog',
    locale => require(`./locales/${locale}.json`)
  )(CatalogContainer)
)
