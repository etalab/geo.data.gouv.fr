import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import styles from './LanguageSelection.scss'

class LanguageSelection extends React.PureComponent {
  static PropTypes = {
    language: PropTypes.string.isRequired
  }

  changeLanguage = e => {
    const { i18n } = this.props

    moment.locale(e.target.value)
    i18n.changeLanguage(e.target.value)
  }

  render() {
    const { language, t } = this.props
    return (
      <div>
        {t('LanguageSelection.languageSelection')} :
        <select className={styles.select} value={language} onChange={this.changeLanguage}>
          <option value='en'>English <span className={styles.emoji} role='img' aria-label='uk-flag'>🇬🇧</span></option>
          <option value='fr'>Français <span className={styles.emoji} role='img' aria-label='fr-flag'>🇫🇷</span></option>
        </select>
      </div>
    )
  }
}

export default translate('Common')(LanguageSelection)
