import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import style from './LanguageSelection.scss'

class LanguageSelection extends Component {
  changeLanguage = e => {
    const { i18n } = this.props

    i18n.changeLanguage(e.target.value)
  }

  render() {
    const { language, t } = this.props
    return (
      <div>
        {t('LanguageSelection.languageSelection')} :
        <select className={style.select} value={language} onChange={this.changeLanguage}>
          <option value="en">English <span className={style.emoji} role="img" aria-label="uk-flag">🇬🇧</span></option>
          <option value="fr">Français <span className={style.emoji} role="img" aria-label="fr-flag">🇫🇷</span></option>
        </select>
      </div>
    )
  }
}

LanguageSelection.propTypes = {
  language: PropTypes.string.isRequired
}

export default translate('Common')(LanguageSelection)
