import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

class ErrorWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    message: PropTypes.string,
    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    message: null
  }

  state = {}

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  render() {
    const {children, message, t} = this.props
    const {error} = this.state

    if (error) {
      return (
        <span>
          {message || t('errors.unknown')}
          <style jsx>{`
            @import 'colors';

            span {
              color: $red;
            }
          `}</style>
        </span>
      )
    }

    return children
  }
}

export default translate()(ErrorWrapper)
