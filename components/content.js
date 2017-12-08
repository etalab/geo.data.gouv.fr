import React from 'react'
import PropTypes from 'prop-types'

const Content = ({ children, clouds }) => (
  <main className={clouds ? 'clouds' : ''}>
    {children}

    <style jsx>{`
      @import 'colors';

      main {
        background-color: $white;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .clouds {
        background: url('/static/images/clouds.svg') bottom -69px left 0, linear-gradient(to top, #41dcd7, #3083b2);
        background-repeat: no-repeat;
        background-size: 1920px;
      }
    `}</style>
  </main>
)

Content.propTypes = {
  children: PropTypes.node,
  clouds: PropTypes.bool
}

Content.defaultProps = {
  clouds: false
}

export default Content
