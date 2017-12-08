import { stringify } from 'querystring'
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { translate } from 'react-i18next'

import Dropdown from '../../dropdown'

export class LanguageSelection extends React.PureComponent {
  static propTypes = {
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired
    }).isRequired,

    router: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object.isRequired,
      asPath: PropTypes.string.isRequired
    }).isRequired
  }

  changeLanguage(language) {
    const { i18n, router } = this.props

    const current = i18n.language

    i18n.changeLanguage(language)

    router.replace(
      `${router.pathname}?${stringify(router.query)}`,
      `/${language}${router.asPath.substring(1 + current.length)}`
    )
  }

  render() {
    const { i18n } = this.props

    return (
      <Dropdown title={i18n.language === 'en' ? '🇬🇧' : '🇫🇷'} links={[
        {
          action: () => this.changeLanguage('en'),
          text: 'English 🇬🇧'
        },
        {
          action: () => this.changeLanguage('fr'),
          text: 'Français 🇫🇷'
        }
      ]} />
    )
  }
}

export default translate()(withRouter(LanguageSelection))
