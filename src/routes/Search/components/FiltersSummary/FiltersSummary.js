import React from 'react'

import Filter from '../../../../components/Filter/Filter'

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

export default FiltersSummary
