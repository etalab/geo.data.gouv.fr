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
  const { type, value, style, onClick } = props

  return (
    <button className="filter-link" title={value} style={{...defaultStyle, ...style}} onClick={() => onClick({name: type, value})}>
      {value}
    </button>
  )
}

export default Filter
