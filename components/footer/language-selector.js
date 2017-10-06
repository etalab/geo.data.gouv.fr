import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

class LanguageSelector extends React.PureComponent {
  static propTypes = {
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
    const { t, i18n } = this.props

    return (
      <div>
        {t('components.LanguageSelection.languageSelection')} :
        <select value={i18n.language} onChange={this.changeLanguage}>
          <option value='en'>English 🇬🇧</option>
          <option value='fr'>Français 🇫🇷</option>
        </select>

        <style jsx>{`
          div {
            padding-top: 1.5em;
          }

          select {
            margin-left: 0.5em;
            width: 100px;
            height: 30px;
          }

          @media (max-width: 768px) {
            div {
              padding-bottom: 1.5em;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate()(LanguageSelector)
