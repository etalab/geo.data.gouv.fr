import React from 'react'
import PropTypes from 'prop-types'

const Box = ({ children, title, subtitle, color }) => (
  <div className='wrapper'>
    {(title || subtitle) && (
      <div className={`header ${color}`}>
        {title && <h3>{title}</h3>}
        {subtitle && <div className='subtitle'>{subtitle}</div>}
      </div>
    )}
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
        font-size: 0.9em;
      }

      .inner {
        padding: 1.5em 1.7em;

        @media (max-width: 551px) {
          padding: 1em;
        }
      }

      // Colors

      .grey {
        background-color: $lightgrey;

        .subtitle {
          color: $grey;
        }
      }

      .blue {
        background-color: $blue;
        color: $white;

        .subtitle {
          color: lighten($blue, 35%);
        }
      }
    `}</style>
  </div>
)

Box.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  color: PropTypes.oneOf([
    'grey',
    'blue'
  ])
}

Box.defaultProps = {
  color: 'grey'
}

export default Box
