import React from 'react'
import PropTypes from 'prop-types'

export const Content = ({ children }) => (
  <main>
    {children}

    <style jsx>{`
      @import 'colors';

      main {
        background-color: $white;
        min-height: 100vh;
        padding: 2em 0;
        background: url('/static/images/clouds.svg') bottom / 101% no-repeat,
                    linear-gradient(to top, #41dcd7, #3083b2);
      }
    `}</style>
  </main>
)

Content.propTypes = {
  children: PropTypes.node
}

export default Content
