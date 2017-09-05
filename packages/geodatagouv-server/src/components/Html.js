import React from 'react'
import { Helmet } from 'react-helmet'

const Html = ({ assets = {}, content, preloadedState }) => {
  // const { scripts, stylesheets, cssHashRaw, publicPath } = assets

  const head = Helmet.rewind()

  return (
    <html {...head.htmlAttributes.toComponent()}>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {/*
        {stylesheets.map((file, key) => (
          <link rel='stylesheet' href={`${publicPath}/${file}`} key={key} />
        ))}
        */}
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{
          __html: content
        }} />
        <script type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`
          }}
        />
        {/*
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `window.__CSS_CHUNKS__ = ${JSON.stringify(cssHashRaw)}`
          }}
        />
        {scripts.map((file, key) => (
          <script type='text/javascript' src={`${publicPath}/${file}`} key={key} />
        ))}
        */}
      </body>
    </html>
  )
}

export default Html
