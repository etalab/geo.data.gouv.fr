import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'

import Facet from 'common/components/Facets/Facet'

import styles from './DatasetFilters.scss'

class DatasetFilters extends React.PureComponent {
  static propTypes = {
    organizations: PropTypes.array.isRequired,
    keywords: PropTypes.array.isRequired,

    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,

    t: PropTypes.func.isRequired
  }

  onSearch = filter => {
    const { history } = this.props

    history.push({
      pathname: '/search',
      search: qs.stringify({
        [filter.name]: filter.value
      })
    })
  }

  render() {
    const { organizations, keywords, t } = this.props

    const sections = [
      { name: 'organization', title: t('components.DatasetFilters.organizationsTitle'), filters: organizations },
      { name: 'keyword', title: t('components.DatasetFilters.keywordsTitle'), filters: keywords }
    ]

    return (
      <div>
        {sections.map(section => section.filters.length > 0 && (
          <div key={section.title} className={styles.group}>
            <h4>{section.title}</h4>
            <div className={styles.facets}>
              {section.filters.map((filter, idx) => (
                <Facet key={idx} name={section.name} value={filter} addFilter={this.onSearch} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default withRouter(translate('Dataset')(DatasetFilters))
