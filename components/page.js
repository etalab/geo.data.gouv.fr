import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import NProgress from 'nprogress'

import Meta from './meta'
import Header from './header'
import Footer from './footer'

import colors from '../styles/colors'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export const Page = ({ children }) => (
  <div className='container'>
    <Meta />
    <Header />
    <div className='content'>
      {children}
    </div>
    <Footer />

    <style jsx>{`
      .container {
        flex-direction: column;
        display: flex;
        position: relative;
      }

      .content {
        z-index: 1;
        background-color: #fff;
        min-height: 100vh;
        background: url('/static/images/clouds.svg') bottom / 101% no-repeat,
                    linear-gradient(to top, #41dcd7, #3083b2);
      }
    `}</style>

    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }

      #nprogress .bar {
        background: ${colors.blue};
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
        box-shadow: 0 0 10px ${colors.blue}, 0 0 5px ${colors.blue};
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }
    `}</style>
  </div>
)

Page.propTypes = {
  children: PropTypes.node
}

export default Page
