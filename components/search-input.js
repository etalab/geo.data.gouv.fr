import {format} from 'url'
import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'next/router'

import {translate} from 'react-i18next'

class SearchInput extends React.PureComponent {
  static propTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
      query: PropTypes.object.isRequired
    }).isRequired,

    placeholder: PropTypes.string,

    hasButton: PropTypes.bool,
    defaultQuery: PropTypes.object,

    i18n: PropTypes.shape({
      language: PropTypes.string.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    placeholder: null,
    defaultQuery: null,
    hasButton: false
  }

  constructor(props) {
    super(props)

    const {router} = this.props

    this.state = {
      value: router.query.q || ''
    }
  }

  onSubmit = event => {
    event.preventDefault()

    const {router, i18n, defaultQuery} = this.props
    const {value} = this.state

    const currentQuery = router.pathname === '/search' ? router.query : {}

    const query = {
      ...defaultQuery,
      ...currentQuery,
      q: value
    }

    // Reset search to first page when firing a new query.
    // We don’t need p=1 in the query string, so let’s drop it.
    delete query.p

    const url = format({
      pathname: '/search',
      query
    })

    router.push(url, `/${i18n.language}${url}`)
  }

  onChange = event => {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const {placeholder, hasButton, t} = this.props
    const {value} = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          name='query'
          value={value}
          placeholder={placeholder || t('search')}
          onChange={this.onChange}
        />

        {hasButton && (
          <button type='submit' />
        )}

        <style jsx>{`
          @import 'colors';

          form {
            width: 100%;
            position: relative;
          }

          input {
            display: block;
            width: 100%;
            border: 1px solid darken($lightgrey, 6%);
            border-radius: 2px;
            margin: 0;
            outline: 0;
            line-height: 2em;
            font-size: 1.4rem;
            padding: 10px 60px 10px 20px;

            &:focus,
            &:active {
              border-color: #85b7d9;
            }

            @media (max-width: 767px) {
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

export default translate()(withRouter(SearchInput))
