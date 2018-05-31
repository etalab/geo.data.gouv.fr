import React from 'react'
import PropTypes from 'prop-types'
import ErrorIcon from 'react-icons/lib/fa/times-circle'

const ErrorMessage = ({small, children}) => (
  <div className='container'>
    <div className={`icon ${small ? 'small' : ''}`}>
      <ErrorIcon />
    </div>

    <div className='text'>
      {children}
    </div>

    <style jsx>{`
      @import 'colors';

      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        padding: 10px;
      }

      .icon {
        display: flex;
        flex-wrap: wrap;
        font-size: 102px;
        margin: auto;
        color: $red;
      }

      .small {
        font-size: 54px;
      }

      .text {
        color: $red;
        font-weight: 600;
        text-align: center;
      }
    `}</style>
  </div>
)

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool
}

ErrorMessage.defaultProps = {
  small: false
}

export default ErrorMessage
