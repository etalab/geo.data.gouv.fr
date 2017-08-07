import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import Filter from 'components/Filter'

import styles from './FiltersSummary.scss'

const FiltersSummary = ({ filters, removeFilter, t }) => (
  <div>
    <div className={styles.label}>
      {filters.length
        ? t('FiltersSummary.activeFilters', { count: filters.length })
        : t('FiltersSummary.noFilters')}
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
  removeFilter: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('Search')(FiltersSummary)
