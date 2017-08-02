import React from 'react'
import PropTypes from 'prop-types'

const CheckItem = ({ name, valid, msg }) => (
  <div>
    <div>{name} {valid ? (
      <i className='checkmark green icon' />
    ) : (
      <i className='remove red icon' />
    )}</div>

    {msg && (
      <div>{msg}</div>
    )}
  </div>
)

CheckItem.propTypes = {
  name: PropTypes.string.isRequired,
  valid: PropTypes.bool,
  msg: PropTypes.string
}

CheckItem.defaultProps = {
  valid: false
}

export default CheckItem
