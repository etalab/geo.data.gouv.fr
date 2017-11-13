import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { get } from 'lodash'

import Counter from '../counter'
import Percent from '../percent'

import Chart from './chart'

// import { DoughnutChart } from '../CatalogCharts'

const Statistics = ({ metrics, t }) => {
  const openness = get(metrics, 'datasets.partitions.openness.yes', 0)
  const download = get(metrics, 'datasets.partitions.download.yes', 0)

  return (
    <div className='container'>
      <div className='block'>
        <h3>
          {t('details.statistics.recordsCount')}
        </h3>
        <Counter
          size='medium'
          value={metrics.records.totalCount}
        />
      </div>

      <div className='block'>
        <h3>
          {t('details.statistics.recordTypeChart')}
        </h3>
        <div>
          <Chart data={metrics.records.partitions.recordType} />
        </div>
      </div>

      <div className='block'>
        <h3>
          {t('details.statistics.metadataTypeChart')}
        </h3>
        <div>
          <Chart data={metrics.records.partitions.metadataType} />
        </div>
      </div>

      <div className='block'>
        <h3>
          {t('details.statistics.openDataPercent')}
        </h3>
        <Percent
          value={openness}
          total={metrics.datasets.totalCount}
          size='medium'
        />
      </div>

      <div className='block'>
        <h3>
          {t('details.statistics.downloadablePercent')}
        </h3>
        <Percent
          value={download}
          total={metrics.datasets.totalCount}
          size='medium'
        />
      </div>

      <div className='block'>
        <h3>
          {t('details.statistics.dataTypeChart')}
        </h3>
        <div>
          <Chart data={metrics.datasets.partitions.dataType} />
        </div>
      </div>

      <style jsx>{`
        @import 'colors';

        .container {
          display: flex;
          flex-wrap: wrap;
          margin: 1em -0.6em 0 -0.6em;

          @media (max-width: 551px) {
            flex-direction: column;
          }
        }

        .block {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 200px;
          border: 1px solid $lightgrey;
          padding: 2em;
          border-radius: 2px;
          margin: 0 0.6em 1em 0.6em;
          flex: 1 1 31%;
          text-align: center;
          max-width: calc(100% - 1.2em);

          div {
            display: flex;
          }
        }
      `}</style>
    </div>
  )
}

Statistics.propTypes = {
  metrics: PropTypes.shape({
    records: PropTypes.shape({
      totalCount: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Statistics)
