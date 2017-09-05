import withLocales from 'common/i18n/withLocales'

import NotFoundPage from './components/NotFoundPage'

export default withLocales(
  'NotFound',
  locale => require(`./locales/${locale}.json`)
)(NotFoundPage)
