import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

import styles from './LanguageSelection.scss'

class LanguageSelection extends React.PureComponent {
  static propTypes = {
    language: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func.isRequired
    }).isRequired
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
        {t('components.LanguageSelection.languageSelection')} :
        <select className={styles.select} value={language} onChange={this.changeLanguage}>
          <option value='en'>English 🇬🇧</option>
          <option value='fr'>Français 🇫🇷</option>
        </select>
      </div>
    )
  }
}

export default translate('Common')(LanguageSelection)
