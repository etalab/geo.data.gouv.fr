import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

import Dropdown from '../Dropdown/Dropdown'

class LanguageSelection extends React.PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired
    }).isRequired
  }

  changeLanguage = language => {
    const { i18n } = this.props

    moment.locale(language)
    i18n.changeLanguage(language)
  }

  render() {
    const { t } = this.props

    return (
      <Dropdown title={t('components.LanguageSelection.languageSelection')}>
        <div onClick={() => this.changeLanguage('en')}>English 🇬🇧</div>
        <div onClick={() => this.changeLanguage('fr')}>Français 🇫🇷</div>
      </Dropdown>
    )
  }
}

export default translate('Common')(LanguageSelection)
