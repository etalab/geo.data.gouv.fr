import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { get } from 'lodash'

import Chart from 'common/components/Charts/Chart'
import DoughnutChart from 'common/components/Charts/DoughnutChart/DoughnutChart'
import Counter from 'common/components/Statistics/Counter/Counter'
import Percent from 'common/components/Statistics/Percent/Percent'

import styles from './CatalogStatistics.scss'

const CatalogStatistics = ({ metrics, t }) => {
  const openness = get(metrics, 'datasets.partitions.openness.yes', 0)
  const download = get(metrics, 'datasets.partitions.download.yes', 0)

  return (
    <div>
      <h2 className={styles.title}>{t('CatalogStatistics.catalogIndicatorTitle')}</h2>
      <div className={styles.section}>

        <div className={styles.chart}>
          <Counter
            size='large'
            value={metrics.records.totalCount}
            title={t('CatalogStatistics.recordsCounterTitle')}
          />
        </div>

        <div className={styles.chart}>
          <Chart
            description={t('CatalogStatistics.recordsChartDescription')}
            chart={<DoughnutChart data={metrics.records.partitions.recordType} />}
          />
        </div>

        <div className={styles.chart}>
          <Chart
            description={t('CatalogStatistics.metadataChartDescritpion')}
            chart={<DoughnutChart data={metrics.records.partitions.metadataType} />}
          />
        </div>
      </div>

      <h2>{t('CatalogStatistics.datasetsIndicatorTitle')}</h2>
      <div className={styles.section}>
        <div className={styles.chart}>
          <Percent
            value={openness}
            total={metrics.datasets.totalCount}
            size='large'
            icon='unlock alternate icon'
            title={t('CatalogStatistics.openDataPercentTitle')}
          />
        </div>

        <div className={styles.chart}>
          <Percent
            value={download}
            total={metrics.datasets.totalCount}
            size='large'
            icon='download'
            title={t('CatalogStatistics.downloadablePercentTitle')}
          />
        </div>

        <div className={styles.chart}>
          <Chart
            description={t('CatalogStatistics.dataTypeChartDescription')}
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
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('Catalogs.Catalog')(CatalogStatistics)
