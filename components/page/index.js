import PropTypes from 'prop-types'
import Router from 'next/router'
import NProgress from 'nprogress'

import Header from './header'
import Footer from './footer'
import Piwik from './piwik'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Page = ({children}) => (
  <div>
    <style jsx global>{`
      @import 'reset';
      @import 'fonts';
    `}</style>

    <Header />
    {children}
    <Footer />
    <Piwik />

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

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page
