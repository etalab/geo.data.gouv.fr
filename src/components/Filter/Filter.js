import React from 'react'
import { link } from './Filter.css'

const Filter = (props) => {
  const { detail, remove, filter, style, onClick } = props

  return (
    <button className={link} title={`${filter.name}: ${filter.value}`} style={style} onClick={() => onClick && onClick(filter)}>
      { detail && `${filter.name}: ` }{filter.value}
      { remove && <span>&nbsp;<i className="fa fa-close" /></span>}
    </button>
  )
}

export default Filter
