import withReducer from 'common/store/withReducer'
import withLocales from 'common/i18n/withLocales'

import SearchContainer from './containers/SearchContainer'
import reducer from './modules/reducer'

export default withReducer('search', reducer)(
  withLocales(
    'Search',
    locale => require(`./locales/${locale}.json`)
  )(SearchContainer)
)
