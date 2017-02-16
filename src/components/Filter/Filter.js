import React from 'react'

import { translateFilters } from '../../helpers/manageFilters'

import { link } from './Filter.css'

const Filter = (props) => {
  const { detail, remove, filter, style, onClick } = props
  const title = translateFilters(filter.name)

  return (
    <button className={link} title={`${title}: ${filter.value}`} style={style} onClick={() => onClick && onClick(filter)}>
      { detail && `${title}: ` }{filter.value}
      { remove && <span>&nbsp;<i className="fa fa-close" /></span>}
    </button>
  )
}

export default Filter
