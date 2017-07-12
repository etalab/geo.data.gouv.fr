import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import createPiwikConnector from 'piwik-react-router'
import moment from 'moment'

// Locale
// ------------------------------------
moment.locale('fr')


// Piwik
// ------------------------------------
createPiwikConnector({
  url: 'https://stats.data.gouv.fr',
  siteId: 32
}).connectToHistory(browserHistory);


// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const Router = require('./router').default

  ReactDOM.render(
    <Router />,
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
      './router',
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
