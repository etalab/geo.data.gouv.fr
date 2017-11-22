import React from 'react'
import PropTypes from 'prop-types'

const Box = ({ children, title }) => (
  <div className='wrapper'>
    {title && <h3>{title}</h3>}
    <div className='inner'>
      {children}
    </div>

    <style jsx>{`
      @import 'colors';

      .wrapper {
        background-color: $white;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        border-radius: 2px;
        margin-bottom: 20px;
        overflow: hidden;
      }

      h3 {
        background-color: $lightgrey;
        font-size: 1.1em;
        margin: 0;
        padding: 0.6em 0.75em 0.55em;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .inner {
        padding: 1.5em 1.7em;

        @media (max-width: 551px) {
          padding: 1em;
        }
      }
    `}</style>
  </div>
)

Box.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}

export default Box
