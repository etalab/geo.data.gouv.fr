import withLocales from 'common/i18n/withLocales'

import NotFoundPage from './NotFoundPage'

export default withLocales(
  'NotFound',
  locale => require(`../locales/${locale}.json`)
)(NotFoundPage)
