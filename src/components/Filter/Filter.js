import React from 'react'

import { translateFilters } from '../../helpers/manageFilters'

import { link, filterValue } from './Filter.css'

const Filter = (props) => {
  const { detail, remove, filter, style, onClick } = props
  const title = translateFilters(filter.name)
  const value = translateFilters(filter.value)

  return (
    <button className={link} title={`${title}: ${value}`} style={style} onClick={() => onClick && onClick(filter)}>
      <span>{ detail && `${title}:` }</span><span className={filterValue}>{value}</span>
      { remove && <span>&nbsp;<i className="fa fa-close" /></span>}
    </button>
  )
}

export default Filter
