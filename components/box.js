import React from 'react'
import PropTypes from 'prop-types'

const Box = ({children, title, padded, color}) => (
  <div className='wrapper'>
    {title && <h3 className={`header ${color}`}>{title}</h3>}
    <div className={padded ? 'padded' : ''}>
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

      .header {
        padding: 0.6em 0.75em 0.55em;
      }

      h3 {
        font-size: 1.1em;
        margin: 0;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: normal;
      }

      .subtitle {
        margin-top: 0.2em;
        font-size: 0.9em;
      }

      .padded {
        padding: 1.5em 1.7em;

        @media (max-width: 551px) {
          padding: 1em;
        }
      }

      // Colors

      .grey {
        background-color: $lightgrey;
      }

      .blue {
        background-color: $blue;
        color: $white;
      }

      .green {
        background-color: $green;
        color: $white;
      }
    `}</style>
  </div>
)

Box.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  padded: PropTypes.bool,
  color: PropTypes.oneOf([
    'grey',
    'blue',
    'green'
  ])
}

Box.defaultProps = {
  color: 'grey',
  title: null,
  padded: true
}

export default Box
