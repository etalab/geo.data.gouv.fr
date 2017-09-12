import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import styles from './Filter.scss'
import closeIcon from './images/close-icon.svg'

const Filter = ({ detail, remove, filter, number, style, onClick, t }) => {
  const title = t(`components.Filter.${filter.name}`)
  const value = t(`components.Filter.${filter.value}`, {
    defaultValue: filter.value
  })

  return (
    <button
      className={styles.link}
      title={`${title}: ${value}`}
      style={style}
      onClick={onClick && (() => onClick(filter))}
    >
      <div className={`${styles.filter} ${number && styles.countedFilter}`}>
        {remove && <img src={closeIcon} />}
        <div>{detail && `${title}:`}</div><span className={styles.filterValue}>{value}</span>
      </div>
      {number && <div className={styles.count}> {number}</div>}
    </button>
  )
}

Filter.propTypes = {
  detail: PropTypes.bool,
  remove: PropTypes.bool,
  filter: PropTypes.shape({
    name: PropTypes.oneOf([
      'availability',
      'dgvPublication',
      'distributionFormat',
      'keyword',
      'metadataType',
      'opendata',
      'organization',
      'representationType',
      'type',
      'catalog'
    ]).isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  number: PropTypes.number,
  style: PropTypes.object,
  onClick: PropTypes.func,

  t: PropTypes.func.isRequired
}

Filter.defaultProps = {
  detail: false,
  remove: false
}

export default translate('Common')(Filter)
