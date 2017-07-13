import React from 'react'
import { applyRouterMiddleware, browserHistory, Router } from 'react-router'
import { useScroll } from 'react-router-scroll'
import PropTypes from 'prop-types'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { routes } = this.props

    return (
      <div>
        <Router
          history={browserHistory}
          children={routes}
          render={applyRouterMiddleware(useScroll())}
        />
      </div>
    )
  }
}

export default App
