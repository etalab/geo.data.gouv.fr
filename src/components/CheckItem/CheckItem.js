import React from 'react'

const CheckItem = ({name, valid}) => {
  const checkmark = <i className="checkmark green icon"></i>
  const remove = <i className="remove red icon"></i>

  return (
    <div>{name} {valid ? checkmark : remove}</div>
  )
}

export default CheckItem
