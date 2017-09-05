import React from 'react'
import ReactDOM from 'react-dom/server'

import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

import fetch from 'node-fetch'
import { Provider } from 'react-redux'

import { StaticRouter, matchPath } from 'react-router'
import { I18nextProvider } from 'react-i18next'

import Html from './components/Html'
import App from 'geodatagouv-client/src/components/App'

import configureI18n from 'geodatagouv-client/src/i18n'
import createStore from 'geodatagouv-client/src/store/createStore'

global.fetch = fetch
global.window = {}

export default ({ clientStats }) => (req, res) => {
  const i18n = configureI18n()
  const store = createStore()

  const chunkNames = flushChunkNames()
  const chunks = flushChunks(clientStats, { chunkNames })

  const match = matchPath(req.url, {
    path: '/datasets/:id',
    strict: true
  })

  console.log(req.url, match)

  const context = {}

  const content = ReactDOM.renderToString(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <StaticRouter context={context} location={req.url}>
          <App store={store} i18n={i18n} />
        </StaticRouter>
      </I18nextProvider>
    </Provider>
  )

  const preloadedState = store.getState()

  const html = ReactDOM.renderToString(
    <Html assets={chunks} content={content} preloadedState={preloadedState} />
  )

  res.send(`<!doctype html>${html}`)
}
