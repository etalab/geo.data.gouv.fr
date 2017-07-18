import React from 'react'
import PropTypes from 'prop-types'

import styles from './SearchInput.scss'

class SearchInput extends React.PureComponent {
  static propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string.isRequired,

    hasButton: PropTypes.bool,
    buttonLabel: PropTypes.string,

    onSearch: PropTypes.func.isRequired
  }

  static defaultProps = {
    placeholder: 'Rechercher…',

    hasButton: false,
    buttonLabel: 'Rechercher'
  }

  onSubmit = event => {
    const { onSearch } = this.props

    event.preventDefault();

    onSearch(event.target.query.value);
  }

  render() {
    const { placeholder, defaultValue, hasButton, buttonLabel } = this.props

    return (
      <form onSubmit={this.onSubmit} className={styles.container}>
        <input
          type='text'
          name='query'
          defaultValue={defaultValue}
          className={styles.input}
          placeholder={placeholder}
        />

        {hasButton && (
          <button type='submit' className={styles.button}>
            {buttonLabel}
          </button>
        )}
      </form>
    )
  }
}

export default SearchInput
