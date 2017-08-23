import withLocales from 'common/i18n/withLocales'

import HomeContainer from './containers/HomeContainer'

export default withLocales(
  'Home',
  locale => require(`./locales/${locale}.json`)
)(HomeContainer)
