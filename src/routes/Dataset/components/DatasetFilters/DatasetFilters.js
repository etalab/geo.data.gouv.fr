import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

import Facet from 'common/components/Facets/Facet'

import styles from './DatasetFilters.scss'

const search = filter => browserHistory.push({
  pathname: '/search',
  query: {
    [filter.name]: filter.value
  }
})

const DatasetFilters = ({ organizations, keywords }) => {
  const sections = [
    { name: 'organization', title: 'Organisations', filters: organizations },
    { name: 'keyword', title: 'Mots-clés', filters: keywords }
  ]

  return (
    <div>
      {sections.map(section => (
        <div key={section.title} className={styles.group}>
          <h4>{section.title}</h4>
          <div className={styles.facets}>
            {section.filters.map((filter, idx) => (
              <Facet key={idx} name={section.name} value={filter} addFilter={search} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

DatasetFilters.propTypes = {
  organizations: PropTypes.array.isRequired,
  keywords: PropTypes.array.isRequired
}

export default DatasetFilters
