import React from 'react'
import { theme } from '../../tools'
import './Filter.css'

const defaultStyle = {
  color: theme.blue,
  backgroundColor: theme.lightestblue,
  textOverflow: 'ellipsis',
  fontSize: '12px',
  maxWidth: '200px',
  overflow: 'hidden',
  border: 'none',
}

const Filter = (props) => {
  const { detail, remove, filter, style, onClick } = props

  return (
    <button className="filter-link" title={`${filter.name}: ${filter.value}`} style={{...defaultStyle, ...style}} onClick={() => onClick && onClick(filter)}>
      { detail && `${filter.name}: ` }{filter.value}
      { remove && <span>&nbsp;<i className="fa fa-close" /></span>}
    </button>
  )
}

export default Filter
