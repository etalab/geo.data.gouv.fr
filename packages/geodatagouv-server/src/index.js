import React from 'react'
import ReactDOM from 'react-dom/server'

import fetch from 'node-fetch'

import { StaticRouter } from 'react-router'
import { I18nextProvider } from 'react-i18next'

import Html from './components/Html'
import App from 'geodatagouv-client/src/components/App'

import configureI18n from 'geodatagouv-client/src/i18n'

global.fetch = fetch
global.window = {}

export default ({ clientStats }) => (req, res) => {
  const i18n = configureI18n()

  console.log(i18n.language)
  console.log(i18n.t('unknownData.unknown'))

  const context = {}

  const content = ReactDOM.renderToString(
    <I18nextProvider i18n={i18n}>
      <StaticRouter context={context} location={req.url}>
        <App i18n={i18n} />
      </StaticRouter>
    </I18nextProvider>
  )

  console.log('REACT ROUTER CONTEXT')
  console.log(context)

  const html = ReactDOM.renderToString(
    <Html content={content} />
  )

  res.send(`<!doctype html>${html}`)
}
