import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'
import { get } from 'lodash'

import Link from './link'
import HarvestStatus from './harvest-status'
import Counter from './counter'
import Percent from './percent'

const isObsolete = (catalog) => {
  const revisionDate = get(catalog, 'metrics.mostRecentRevisionDate')

  return revisionDate && moment().subtract(6, 'months').isAfter(revisionDate)
}

export const CatalogPreview = ({ catalog, t }) => {
  let metrics = catalog.metrics
  let openness = get(metrics, 'datasets.partitions.openness.yes', 0)
  let download = get(metrics, 'datasets.partitions.download.yes', 0)

  return (
    <Link href={`/catalog?id=${catalog._id}`} as={`/catalogs/${catalog._id}`}>
      <a>
        <div className='title'>
          {isObsolete(catalog) && (
            <img
              src='/static/images/icons/warning.svg'
              title={t('components.CatalogPreview.obsoleteCatalog')}
              alt={t('components.CatalogPreview.obsoleteCatalog')}
            />
          )}

          <span title={catalog.name}>
            {catalog.name}
          </span>
        </div>
        <HarvestStatus harvest={catalog.service.sync} />

        <div className='metrics'>
          {!metrics ? <div>{t('components.CatalogPreview.noData')}</div> : (
            <div>
              <Percent
                value={openness}
                total={metrics.datasets.totalCount}
                size='small'
                label={t('components.CatalogPreview.openDataLabel')} />

              <Percent
                value={download}
                total={metrics.datasets.totalCount}
                size='small'
                label={t('components.CatalogPreview.downloadableLabel')} />

              <Counter
                value={metrics.records.totalCount}
                size='small'
                label={t('components.CatalogPreview.recordsLabel')} />
            </div>
          )}
        </div>

        <style jsx>{`
          @import 'colors';

          a {
            display: block;
            padding: 16px 22px;
            text-align: left;
            position: relative;
            width: 360px;
            color: $darkgrey;
            border-radius: 5px;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            background: $white;
            background: linear-gradient(180deg, #fdfdf8, $white);

            @media (max-width: 551px) {
              width: 100%;
            }
          }

          img {
            height: 23px;
            display: inline-block;
            vertical-align: bottom;
            margin-right: 5px;
          }

          .title {
            font-size: 1.4em;
            line-height: 1.2em;

            @media (min-width: 552px) {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .metrics > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 3em;
            font-size: 11px;

            > div {
              margin: 0 0.5em;

              &:first-child {
                margin-left: 0;
              }

              &:last-child {
                margin-right: 0;
              }
            }
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
