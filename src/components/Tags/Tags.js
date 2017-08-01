import React from 'react'

const Tags = ({ tags }) => {
  let arr = []

  for (var i = 0; i < tags.length; i++) {
    arr.push(<a className='ui small tag label' key={i}>{tags[i]}</a>)
  }

  return (<div>{arr}</div>)
}

export default Tags
