import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import createPiwikConnector from 'piwik-react-router'

import createStore from './store/createStore'

// Store Initialization
// ------------------------------------
const store = createStore(window.__INITIAL_STATE__)

// Piwik
// ------------------------------------
const { PIWIK_URL, PIWIK_SITE_ID } = process.env
if (PIWIK_URL && PIWIK_SITE_ID) {
  const piwik = createPiwikConnector({
    url: PIWIK_URL,
    siteId: PIWIK_SITE_ID,
    ignoreInitialVisit: true
  })

  // Initial visit are not reported when using browserHistory.
  // Here we’re tracking the initial page manually.
  piwik.track(browserHistory.getCurrentLocation())

  piwik.connectToHistory(browserHistory)
}

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default
  const i18n = require('./i18n').default()
  const routes = require('./routes').default(store, i18n)

  ReactDOM.render(
    <App store={store} routes={routes} i18n={i18n} />,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './i18n/index',
      './routes/index'
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
