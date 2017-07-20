import React from 'react'
import PropTypes from 'prop-types'

import Loader from 'common/components/Loader'
import Chart from 'common/components/Charts/Chart'
import Histogram from 'common/components/Charts/Histogram/Histogram'

import CatalogHarvestsTable from '../CatalogHavestsTable'

import styles from './CatalogHarvestsView.scss'

class CatalogHarvestsView extends React.PureComponent {
  static propTypes = {
    harvests: PropTypes.shape({
      harvests: PropTypes.array.isRequired,
      pending: PropTypes.bool.isRequired,
      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired,
    }).isRequired,

    catalog: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      service: PropTypes.shape({
        sync: PropTypes.shape({
          pending: PropTypes.bool.isRequired
        }).isRequired
      }).isRequired
    }).isRequired,

    syncCatalog: PropTypes.func.isRequired
  }

  onSync = event => {
    const { catalog, syncCatalog } = this.props

    syncCatalog(catalog._id)
  }

  getGraphData = () => {
    const { harvests } = this.props

    const ordered = [...harvests.harvests].reverse()
    const data = []

    ordered.forEach(harvest => {
      if (harvest.status === 'successful') {
        const date = new Date(harvest.finished).toLocaleDateString().split('-').reverse().join('/')
        data[date] = harvest.itemsFound
      }
    })

    return data
  }

  render() {
    const { harvests, catalog } = this.props

    return (
      <div>
        <h2>Moissonnage du catalogue</h2>

        <Loader loading={harvests.pending} error={harvests.error}>
          <div className={styles.container}>
            <div className={styles.table}>
              <CatalogHarvestsTable
                catalogId={catalog._id}
                harvests={harvests.harvests}
                harvesting={catalog.service.sync.pending}
              />

              <button
                className={styles.sync}
                disabled={catalog.service.sync.pending}
                onClick={this.onSync}
              >
                Synchroniser
              </button>
            </div>
            <div className={styles.stats}>
              <Chart
                title={'Évolution des Enregistrements'}
                description={'Évolution du nombre d’enregistrements par moissonnage'}
                chart={
                  <Histogram data={this.getGraphData()} />
                }
              />
            </div>
          </div>
        </Loader>
      </div>
    )
  }
}

export default CatalogHarvestsView
