import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { translate } from 'react-i18next'
import { get } from 'lodash'

import colors from '../styles/colors'

import HarvestStatus from './harvest-status'
// import Counter from '../Statistics/Counter/Counter'
// import Percent from '../Statistics/Percent/Percent'

// import ObsoleteWarning from './ObsoleteWarning'

// import styles from './CatalogPreview.scss'

export const CatalogPreview = ({ catalog, t }) => {
  let metrics = catalog.metrics
  let openness = get(metrics, 'datasets.partitions.openness.yes', 0)
  let download = get(metrics, 'datasets.partitions.download.yes', 0)

  const metricsPreview = !metrics ? (
    <div>{t('components.CatalogPreview.noData')}</div>
  ) : (
    <div>
      {/* <Percent
        value={openness}
        total={metrics.datasets.totalCount}
        size='small'
        label={t('components.CatalogPreview.openDataLabel')}
      />
      <Percent
        value={download}
        total={metrics.datasets.totalCount}
        size='small'
        label={t('components.CatalogPreview.downloadableLabel')}
      />
      <Counter value={metrics.records.totalCount} size='small' label={t('components.CatalogPreview.recordsLabel')} /> */}
    </div>
  )

  return (
    <Link href={`/catalogs/${catalog._id}`}>
      <a>
        <h3>{catalog.name}</h3>
        <HarvestStatus harvest={catalog.service.sync} />
        {/* <ObsoleteWarning catalog={catalog} /> */}

        <div className='metrics'>
          {metricsPreview}
        </div>

        <style jsx>{`
          a {
            display: block;
            padding: 1.4em 2em;
            position: relative;
            width: 340px;
            color: ${colors.darkgrey};
            border-radius: 5px;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            background: ${colors.white};
            background: linear-gradient(180deg, #fdfdf8, ${colors.white});
          }

          h3 {
            font-size: 1.4em;
            font-weight: normal;
            margin: 0;
          }

          .metrics {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 3em;
            font-size: 11px;
          }
        `}</style>
      </a>
    </Link>
  )
}

CatalogPreview.propTypes = {
  catalog: PropTypes.shape({
    metrics: PropTypes.shape({
      datasets: PropTypes.shape({
        totalCount: PropTypes.number.isRequired
      }).isRequired,

      records: PropTypes.shape({
        totalCount: PropTypes.number.isRequired
      }).isRequired
    }),

    service: PropTypes.shape({
      sync: PropTypes.object.isRequired
    }).isRequired
  }),

  t: PropTypes.func.isRequired
}

export default translate()(CatalogPreview)
