import React from 'react'
import PropTypes from 'prop-types'
import ErrorIcon from 'react-icons/lib/fa/times-circle'

const ErrorMessage = ({children}) => (
  <div className='container'>
    <div className='icon'>
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

      .text {
        color: $red;
        font-weight: bold;
        text-align: center;
      }
    `}</style>
  </div>
)

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorMessage
