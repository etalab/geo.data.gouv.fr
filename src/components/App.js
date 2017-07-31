import React from 'react'
import PropTypes from 'prop-types'

import { applyRouterMiddleware, browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { useScroll } from 'react-router-scroll'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { routes, store, i18n } = this.props

    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Router
            history={browserHistory}
            children={routes}
            render={applyRouterMiddleware(useScroll())}
          />
        </I18nextProvider>
      </Provider>
    )
  }
}

export default App
