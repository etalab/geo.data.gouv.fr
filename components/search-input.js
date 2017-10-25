import React from 'react'
import PropTypes from 'prop-types'

import { translate } from 'react-i18next'

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
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          name='query'
          defaultValue={defaultValue}
          placeholder={placeholder || t('components.SearchInput.placeholder')}
        />

        {hasButton && (
          <button type='submit' />
        )}

        <style jsx>{`
          form {
            width: 100%;
            position: relative;
          }

          input {
            display: block;
            width: 100%;
            border: 1px solid rgba(34, 36, 38, 0.15);
            border-radius: 2px;
            margin: 0;
            outline: 0;
            line-height: 2em;
            font-size: 1.5rem;
            padding: 10px 60px 10px 20px;

            &:focus,
            &:active {
              border-color: #85b7d9;
            }

            @media (max-width: 768px) {
              font-size: 1.2rem;
            }
          }

          button {
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            background: #fff;
            border: 0 none;
            cursor: pointer;
            width: 50px;
            padding: 0 5px;
            outline: 0;
            background: url('/static/images/icons/search.svg') center left no-repeat;
          }
        `}</style>
      </form>
    )
  }
}

export default translate()(SearchInput)
