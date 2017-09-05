import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import App from './App'

class Client extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    i18n: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { store, i18n } = this.props

    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <App store={store} i18n={i18n} />
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    )
  }
}

export default Client
