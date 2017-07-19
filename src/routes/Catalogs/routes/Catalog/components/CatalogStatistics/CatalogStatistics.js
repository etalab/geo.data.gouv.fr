import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import Chart from 'common/components/Charts/Chart'
import DoughnutChart from 'common/components/Charts/DoughnutChart/DoughnutChart'
import Counter from 'common/components/Statistics/Counter/Counter'
import Percent from 'common/components/Statistics/Percent/Percent'

import styles from './CatalogStatistics.scss'

const CatalogStatistics = ({ metrics }) => {
  const openness = get(metrics, 'datasets.partitions.openness.yes', 0)
  const download = get(metrics, 'datasets.partitions.download.yes', 0)

  return (
    <div>
      <h2 className={styles.title}>Indicateurs concernant la totalité du catalogue</h2>
      <div className={styles.section}>

        <div className={styles.chart}>
          <Counter
            size="large"
            value={metrics.records.totalCount}
            title="Enregistrements"
          />
        </div>

        <div className={styles.chart}>
          <Chart
            description={'Répartition des types d\'enregistrements'}
            chart={<DoughnutChart data={metrics.records.partitions.recordType} />}
          />
        </div>

        <div className={styles.chart}>
          <Chart
            description={'Répartition des types de meta donnée'}
            chart={<DoughnutChart data={metrics.records.partitions.metadataType} />}
          />
        </div>
      </div>

      <h2>Indicateurs concernant les jeux de données</h2>
      <div className={styles.section}>
        <div className={styles.chart}>
          <Percent
            value={openness}
            total={metrics.datasets.totalCount}
            size="large"
            icon="unlock alternate icon"
            title="Pourcentage de données ouvertes"
          />
        </div>

        <div className={styles.chart}>
          <Percent
            value={download}
            total={metrics.datasets.totalCount}
            size="large"
            icon="download"
            title="Pourcentage de jeu de données téléchargeable"
          />
        </div>

        <div className={styles.chart}>
          <Chart
            description={'Répartition des types de donnée'}
            chart={<DoughnutChart data={metrics.datasets.partitions.dataType} />} />
        </div>
      </div>
    </div>
  )
}

CatalogStatistics.propTypes = {
  metrics: PropTypes.shape({
    records: PropTypes.shape({
      totalCount: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
}

export default CatalogStatistics
