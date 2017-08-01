import React from 'react'

const CheckItem = ({ name, valid, msg }) => {
  const checkmark = <i className='checkmark green icon' />
  const remove = <i className='remove red icon' />

  return (
    <div>
      <div>{name} {valid ? checkmark : remove}</div>
      {msg ? <div>{msg}</div> : undefined}
    </div>
  )
}

export default CheckItem
