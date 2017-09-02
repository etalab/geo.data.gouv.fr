import React from 'react'
import { Helmet } from 'react-helmet'

const Html = ({ assets = {}, content }) => {
  const head = Helmet.rewind()

  return (
    <html {...head.htmlAttributes.toComponent()}>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{
          __html: content
        }} />
        <script charSet='UTF-8' src={`/scripts/manifest.js`} />
        <script charSet='UTF-8' src={`/scripts/vendor.js`} />
        <script charSet='UTF-8' src={`/scripts/app.js`} />
      </body>
    </html>
  )
}

export default Html
