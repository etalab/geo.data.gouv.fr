import React from 'react'
import { translate } from 'react-i18next'
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

const DatasetFilters = ({ organizations, keywords, t }) => {
  const sections = [
    { name: 'organization', title: t('DatasetFilters.organizationsTitle'), filters: organizations },
    { name: 'keyword', title: t('DatasetFilters.keywordsTitle'), filters: keywords }
  ]

  return (
    <div>
      {sections.map(section => section.filters.length > 0 && (
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
  keywords: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('Dataset')(DatasetFilters)
