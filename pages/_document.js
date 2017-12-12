import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />

          <meta name='theme-color' content='#ffffff' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
          <link rel='manifest' href='/static/favicons/manifest.json' />
          <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />

          <link rel='preload' href='/static/fonts/lato-regular-webfont.woff2' as='font' type='font/woff2' crossOrigin='' />
        </Head>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{
            __html: `
              (function () {
                if ('fonts' in document) {
                  if (sessionStorage.fontsLoaded) {
                    document.documentElement.classList.add('font-stage-2')
                    return
                  }

                  document.fonts.load('1em LatoInitial').then(function () {
                    document.documentElement.classList.add('font-stage-1')

                    Promise.all([
                      document.fonts.load('400 1em Lato'),
                      document.fonts.load('700 1em Lato'),
                      document.fonts.load('italic 1em Lato'),
                      document.fonts.load('italic 700 1em Lato')
                    ]).then(function () {
                      document.documentElement.classList.add('font-stage-2')
                      sessionStorage.fontsLoaded = true
                    })
                  })
                } else {
                  document.documentElement.classList.add('font-stage-2')
                }
              })()
            `
          }} />
          <script src='https://cdn.polyfill.io/v2/polyfill.min.js?features=default,modernizr:es6array,modernizr:es7array' />
          <NextScript />
        </body>
      </html>
    )
  }
}
