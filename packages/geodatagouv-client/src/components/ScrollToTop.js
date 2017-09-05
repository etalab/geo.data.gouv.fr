import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props

    if (location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}

export default withRouter(ScrollToTop)
