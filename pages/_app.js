import React from 'react'
import App, {Container} from 'next/app'
import {flowRight} from 'lodash'
import Head from 'next/head'
import getConfig from 'next/config'

import {languages} from '../lib/i18n'

import attachI18n from '../components/hoc/attach-i18n'
import attachSession from '../components/hoc/attach-session'

const {publicRuntimeConfig: {
  PUBLIC_URL,
  PIWIK_URL,
  PIWIK_SITE_ID
}} = getConfig()

const Reset = () => (
  <style jsx global>{`
    @import 'reset';
  `}</style>
)

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let languageContext = {}
    if (ctx.req) {
      languageContext = {
        language: ctx.req.i18n.languages[0],
        url: ctx.req.originalUrl
      }
    }

    return {pageProps, languageContext}
  }

  logPageView() {
    if (window.Piwik) {
      const tracker = window.Piwik.getTracker(`${PIWIK_URL}/piwik.php`, PIWIK_SITE_ID)

      if (tracker) {
        tracker.trackPageView()
      }
    }
  }

  componentDidMount() {
    this.logPageView()
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.logPageView()
    }, 300)
  }

  render() {
    const {Component, pageProps, languageContext, i18n, router} = this.props

    const language = languageContext.language || i18n.languages[0]
    const asPath = languageContext.url || router.asPath

    let alternateLanguages = []
    const prefix = `/${language}/`
    if (asPath.startsWith(prefix)) {
      alternateLanguages = languages.filter(lang => lang !== language).map(lang => ({
        lang,
        url: `${PUBLIC_URL}/${lang}/${asPath.slice(prefix.length)}`
      }))
    }

    return (
      <Container>
        <Reset />

        <Component {...pageProps} />

        <Head>
          {alternateLanguages.map(({lang, url}) => (
            <link key={lang} rel='alternate' hrefLang={lang} href={url} />
          ))}
        </Head>
      </Container>
    )
  }
}

export default flowRight(
  attachI18n(),
  attachSession
)(MyApp)
