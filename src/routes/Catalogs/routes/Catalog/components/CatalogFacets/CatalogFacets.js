import React from 'react'
import PropTypes from 'prop-types'

import Facet from 'common/components/Facets/Facet'

import styles from './CatalogFacets.scss'

const CatalogFacets = ({ title, type, filters, onSearch }) => (
  <div className={styles.container}>
    <h2>{title}</h2>

    {Object.entries(filters).map(([key, filter]) => (
      <div key={key} className={styles.facet}>
        <Facet
          name={type}
          value={key}
          count={filter}
          addFilter={onSearch}
        />
      </div>
    ))}
  </div>
)

CatalogFacets.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,

  onSearch: PropTypes.func.isRequired
}

export default CatalogFacets
