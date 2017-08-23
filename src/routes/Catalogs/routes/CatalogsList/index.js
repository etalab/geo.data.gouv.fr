import withReducer from 'common/store/withReducer'
import withLocales from 'common/i18n/withLocales'

import CatalogContainer from './containers/CatalogsListContainer'
import reducer from './modules/reducer'

export default withReducer('catalogs', reducer)(
  withLocales(
    'Catalogs.CatalogsList',
    locale => require(`./locales/${locale}.json`)
  )(CatalogContainer)
)
