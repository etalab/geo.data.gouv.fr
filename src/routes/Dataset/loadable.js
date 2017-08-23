import withReducer from 'common/store/withReducer'
import withLocales from 'common/i18n/withLocales'

import DatasetContainer from './containers/DatasetContainer'
import reducer from './modules/reducer'

export default withReducer('dataset', reducer)(
  withLocales(
    'Dataset',
    locale => require(`./locales/${locale}.json`)
  )(DatasetContainer)
)
