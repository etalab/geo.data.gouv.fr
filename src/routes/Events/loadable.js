import withLocales from 'common/i18n/withLocales'

import EventsContainer from './containers/EventsContainer'

export default withLocales(
  'Events',
  locale => require(`./locales/${locale}.json`)
)(EventsContainer)
