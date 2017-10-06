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
            display: flex;
            flex-direction: row;
            background: #fff;
            border: 1px solid rgba(34, 36, 38, 0.15);
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

            border-radius: 5px;
          }

          input {
            margin: 0;
            flex: 1 0 auto;
            outline: 0;
            line-height: 2em;
            font-size: 1.5em;
            padding: 0.59em 1em;
            border: 0;

            color: #000;
          }

          input:focus,
          input:active {
            border-color: #85b7d9;
          }

          button {
            cursor: pointer;
            margin: 1em;
            display: inline-block;
            min-height: 1em;
            outline: 0;
            border: 0;
            vertical-align: baseline;
            padding: 0.8em 1.5em;
            background: url('/static/images/icons/search.svg') center left no-repeat;
          }

          @media (max-width: 768px) {
            form {
              border-radius: 0;
            }
          }

          @media (max-width: 551px) {
            button {
              margin: 0 0 0 -2em;
            }
          }
        `}</style>
      </form>
    )
  }
}

export default translate()(SearchInput)
