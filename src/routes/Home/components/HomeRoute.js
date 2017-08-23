import React from 'react'
import PropTypes from 'prop-types'

import { injectLocale } from 'common/i18n/helpers'

import HomeContainer from '../containers/HomeContainer'

class HomeRoute extends React.Component {
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
        namespace: 'Home',
        resources: require(`../locales/${lang}.json`)
      })
    })
  }

  render() {
    const { i18n, ...otherProps } = this.props

    return (
      <HomeContainer {...otherProps} />
    )
  }
}

export default HomeRoute
