import withReducer from 'common/store/withReducer'
import withLocales from 'common/i18n/withLocales'

import CatalogHarvestContainer from './containers/CatalogHarvestContainer'
import reducer from '../Catalog/modules/reducer'

export default withReducer('catalog', reducer)(
  withLocales(
    'Catalogs.CatalogHarvest',
    locale => require(`./locales/${locale}.json`)
  )(CatalogHarvestContainer)
)
