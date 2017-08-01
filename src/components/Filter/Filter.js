import React from 'react'

import { translateFilters } from '../../helpers/manageFilters'

import styles from './Filter.scss'

const Filter = ({ detail, remove, filter, style, onClick }) => {
  const title = translateFilters(filter.name)
  const value = translateFilters(filter.value)

  return (
    <button
      className={styles.link}
      title={`${title}: ${value}`}
      style={style}
      onClick={() => onClick && onClick(filter)}
    >
      <span>{detail && `${title}:`}</span><span className={styles.filterValue}>{value}</span>
      {remove && (
        <span> <i className="remove icon" /></span>
      )}
    </button>
  )
}

export default Filter
