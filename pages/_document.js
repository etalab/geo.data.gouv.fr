import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import getConfig from 'next/config'
import flush from 'styled-jsx/server'

const {publicRuntimeConfig: {
  PIWIK_URL,
  PIWIK_SITE_ID
}} = getConfig()

class MyDocument extends Document {
  static getInitialProps({renderPage, req}) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    const [language] = req.i18n.languages

    return {
      html,
      head,
      errorHtml,
      chunks,
      styles,
      language
    }
  }

  render() {
    const {language} = this.props

    return (
      <html lang={language}>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />

          <meta name='theme-color' content='#ffffff' />
          <link rel='apple-touch-icon' sizes='180x180' href='/static/favicons/apple-icon-180x180.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png' />
          <link rel='manifest' href='/static/favicons/manifest.json' />
          <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#5bbad5' />
        </Head>

        <body>
          <Main />
          <script src='https://cdn.polyfill.io/v2/polyfill.min.js?features=default,modernizr:es6array,modernizr:es7array' />
          {PIWIK_URL && PIWIK_SITE_ID && <script defer async src={`${PIWIK_URL}/piwik.js`} />}
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
