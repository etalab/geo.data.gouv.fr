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
        background: $blue;
        font-size: 1.2em;
        color: $white;
        margin: 0;
        padding: 0.6em 1em;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .inner {
        padding: 1.6em 2em;

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
