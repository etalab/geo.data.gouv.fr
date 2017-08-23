import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { injectLocale } from 'common/i18n/helpers'

import NotFoundPage from './NotFoundPage'

class NotFoundRoute extends React.Component {
  static propTypes = {
    i18n: PropTypes.shape({
      availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }

  componentWillMount() {
    const { i18n } = this.props

    i18n.availableLanguages.forEach(lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'NotFound',
        resources: require(`../locales/${lang}.json`)
      })
    })
  }

  render() {
    const { i18n, ...otherProps } = this.props

    return (
      <NotFoundPage {...otherProps} />
    )
  }
}

export default translate()(NotFoundRoute)
