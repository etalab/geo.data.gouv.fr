import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import searchIcon from './images/search_icon.svg'

import styles from './SearchInput.scss'

class SearchInput extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,

    hasButton: PropTypes.bool,

    onSearch: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    defaultValue: '',

    hasButton: false
  }

  onSubmit = event => {
    const { onSearch } = this.props

    event.preventDefault()

    onSearch(event.target.query.value)
  }

  render() {
    const { placeholder, defaultValue, hasButton, t } = this.props

    return (
      <form onSubmit={this.onSubmit} className={styles.container}>
        <input
          type='text'
          name='query'
          defaultValue={defaultValue}
          className={styles.input}
          placeholder={placeholder || t('components.SearchInput.placeholder')}
        />

        {hasButton && (
          <button type='submit' className={styles.button}>
            <img src={searchIcon} alt='search icon' />
          </button>
        )}
      </form>
    )
  }
}

export default translate('Common')(SearchInput)
