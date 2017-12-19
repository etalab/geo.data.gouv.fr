import React from 'react'
import PropTypes from 'prop-types'

const Content = ({children, clouds}) => (
  <main className={clouds ? 'clouds' : ''}>
    {children}

    <style jsx>{`
      @import 'colors';

      main {
        background-color: $white;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        flex: auto;
      }

      .clouds {
        background-image: url('/static/images/clouds.svg'), linear-gradient(to top, #41dcd7, #3083b2);
        background-position: bottom -69px center, top;
        background-repeat: no-repeat;
        background-size: 1920px;

        @media (max-width: 551px) {
          background-position: bottom 0 center, top;
        }
      }
    `}</style>
  </main>
)

Content.propTypes = {
  children: PropTypes.node.isRequired,
  clouds: PropTypes.bool
}

Content.defaultProps = {
  clouds: false
}

export default Content
