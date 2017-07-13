import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import createPiwikConnector from 'piwik-react-router'
import moment from 'moment'

import createStore from './store/createStore'

// Locale
// ------------------------------------
moment.locale('fr')


// Store Initialization
// ------------------------------------
// This will be a redux store eventually, for now we just define
// an empty object so that we have something to pass along the
// routers.
const store = createStore(window.__INITIAL_STATE__)


// Piwik
// ------------------------------------
const { PIWIK_URL, PIWIK_SITE_ID } = process.env

if (PIWIK_URL && PIWIK_SITE_ID) {
  createPiwikConnector({
    url: PIWIK_URL,
    siteId: PIWIK_SITE_ID
  }).connectToHistory(browserHistory);
}


// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default
  const routes = require('./routes').default(store)

  ReactDOM.render(
    <App store={store} routes={routes} />,
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
