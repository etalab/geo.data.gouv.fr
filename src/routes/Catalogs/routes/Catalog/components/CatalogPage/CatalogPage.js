import React from 'react'
import PropTypes from 'prop-types'
import qs from 'querystring'

import Loader from 'common/components/Loader'

import CatalogView from '../CatalogView'

import styles from './CatalogPage.scss'

class CatalogPage extends React.PureComponent {
  static propTypes = {
    catalog: PropTypes.shape({
      catalog: PropTypes.object,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired
    }).isRequired,

    metrics: PropTypes.shape({
      metrics: PropTypes.object,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired
    }).isRequired,

    match: PropTypes.shape({
      params: PropTypes.shape({
        catalogId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,

    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),

    getCatalog: PropTypes.func.isRequired,
    getMetrics: PropTypes.func.isRequired
  }

  onSearch = query => {
    const { history } = this.props

    history.push({
      pathname: '/search',
      search: qs.stringify(query)
    })
  }

  componentDidMount() {
    const { match, getCatalog, getMetrics } = this.props

    getCatalog(match.params.catalogId)
    getMetrics(match.params.catalogId)
  }

  render() {
    const { catalog, metrics } = this.props

    return (
      <div className={styles.container}>
        <Loader isLoading={catalog.pending || metrics.pending} error={catalog.error || metrics.error}>
          <CatalogView
            catalog={catalog.catalog}
            metrics={metrics.metrics}
            onSearch={this.onSearch}
          />
        </Loader>
      </div>
    )
  }
}

export default CatalogPage
