import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

import Dropdown from '../dropdown'

export class LanguageSelection extends React.PureComponent {
  static propTypes = {
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired
    }).isRequired
  }

  changeLanguage(language) {
    const { i18n } = this.props

    moment.locale(language)
    i18n.changeLanguage(language)
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

export default translate()(LanguageSelection)
