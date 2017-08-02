import React from 'react'
import PropTypes from 'prop-types'

import Filter from 'components/Filter'

import styles from './FiltersSummary.scss'

const FiltersSummary = ({ filters, removeFilter }) => (
  <div>
    <div className={styles.label}>
      {filters.length ? 'Filtres actifs' : 'Aucun filtre actif'}
    </div>
    {filters.map((filter, idx) => (
      <Filter
        key={idx}
        detail
        remove
        filter={filter}
        onClick={filter => removeFilter(filter)}
      />
    ))}
  </div>
)

FiltersSummary.propTypes = {
  filters: PropTypes.array.isRequired,
  removeFilter: PropTypes.func.isRequired
}

export default FiltersSummary
