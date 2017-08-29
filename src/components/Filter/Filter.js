import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import styles from './Filter.scss'

const Filter = ({ detail, remove, filter, style, onClick, t }) => {
  const title = t(`components.Filter.types.${filter.name}`)
  const value = t(`components.Filter.values.${filter.value}`, {
    defaultValue: filter.value
  })

  return (
    <button
      className={styles.link}
      title={`${title}: ${value}`}
      style={style}
      onClick={onClick && (() => onClick(filter))}
    >
      <span>{detail && `${title}:`}</span><span className={styles.filterValue}>{value}</span>
      {remove && (
        <span> <i className='remove icon' /></span>
      )}
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
  style: PropTypes.object,
  onClick: PropTypes.func,

  t: PropTypes.func.isRequired
}

Filter.defaultProps = {
  detail: false,
  remove: false
}

export default translate('Common')(Filter)
