import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import getConfig from 'next/config'
import NProgress from 'nprogress'
import {translate} from 'react-i18next'

import Content from '../content'
import Container from '../container'
import Meta from '../meta'

import Header from './header'
import Footer from './footer'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const {publicRuntimeConfig: {
  PIWIK_URL,
  PIWIK_SITE_ID
}} = getConfig()

class Page extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    ready: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  }

  componentDidMount() {
    setTimeout(() => {
      if (window.Piwik) {
        const tracker = window.Piwik.getTracker(`${PIWIK_URL}/piwik.php`, PIWIK_SITE_ID)

        if (tracker) {
          tracker.trackPageView()
        }
      }
    }, 300)
  }

  render() {
    const {children, t, ready} = this.props

    return (
      <div>
        <Header />
        {ready ? children() : (
          <Content>
            <Meta />
            <Container>
              {t('loading')}
            </Container>
          </Content>
        )}
        <Footer />

        <style jsx>{`
          div {
            display: flex;
            min-height: 100vh;
            flex-direction: column;
            position: relative;
          }
        `}</style>

        <style jsx global>{`
          @import 'colors';

          #nprogress {
            pointer-events: none;
          }

          #nprogress .bar {
            background: $blue;
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
          }

          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px $blue, 0 0 5px $blue;
            opacity: 1.0;
            transform: rotate(3deg) translate(0px, -4px);
          }
        `}</style>
      </div>
    )
  }
}

export default translate()(Page)
