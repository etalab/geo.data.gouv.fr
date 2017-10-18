import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

import Dropdown from '../Dropdown/Dropdown'

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
      <Dropdown title={i18n.language === 'en' ? '🇬🇧' : '🇫🇷'}>
        <div onClick={() => this.changeLanguage('en')}>English 🇬🇧</div>
        <div onClick={() => this.changeLanguage('fr')}>Français 🇫🇷</div>
      </Dropdown>
    )
  }
}

export default translate('Common')(LanguageSelection)
