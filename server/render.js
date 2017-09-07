import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import App from '../src/components/App'

import createStore from '../src/store/createStore'
import bootstrapI18n from '../src/i18n'

import fetch from 'node-fetch'

global.fetch = fetch

export default ({ clientStats }) => (req, res) => {
  const i18n = bootstrapI18n()
  const store = createStore()
  const context = {}

  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </I18nextProvider>
    </Provider>
  )

  Promise
    .all(store.thunks)
    .then(() => {
      const helmet = Helmet.renderStatic()
      const preloadedState = store.getState()
      const chunkNames = flushChunkNames()

      const {
        js,
        styles,
        cssHash,
        // scripts,
        // stylesheets
      } = flushChunks(clientStats, { chunkNames })

      console.log('URL', req.url)
      console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
      // console.log('SCRIPTS SERVED', scripts)
      // console.log('STYLESHEETS SERVED', stylesheets)

      res.send(
        `<!doctype html>
          <html ${helmet.htmlAttributes.toString()}>
            <head>
              <meta charset="utf-8">
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              ${styles}
            </head>
            <body ${helmet.bodyAttributes.toString()}>
              <div id="root">${app}</div>
              <script type='text/javascript'>window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState)}</script>
              ${cssHash}
              ${js}
            </body>
          </html>`
      )
    })
}
