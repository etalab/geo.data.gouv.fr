import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {get} from 'lodash'

import WarningIcon from 'react-icons/lib/fa/exclamation-triangle'

import {isObsolete} from '../lib/catalog'

import Link from './link'
import HarvestStatus from './harvest-status'
import Counter from './counter'
import Percent from './percent'

const CatalogPreview = ({catalog, t}) => {
  const metrics = catalog.metrics
  const openness = get(metrics, 'datasets.partitions.openness.yes', 0)
  const download = get(metrics, 'datasets.partitions.download.yes', 0)

  return (
    <Link href={`/catalog?cid=${catalog._id}`} as={`/catalogs/${catalog._id}`}>
      <a>
        {isObsolete(catalog) && (
          <span className='obsolete' title={t('catalog.obsolete')}>
            <WarningIcon />
          </span>
        )}

        <div className='title'>
          <span title={catalog.name}>
            {catalog.name}
          </span>
        </div>
        <HarvestStatus harvest={catalog.service.sync} />

        <div className='metrics'>
          {metrics ? (
            <div>
              <Percent
                value={openness}
                total={metrics.datasets.totalCount}
                size='small'
                label={t('catalog.openData')} />

              <Percent
                value={download}
                total={metrics.datasets.totalCount}
                size='small'
                label={t('catalog.downloadable')} />

              <Counter
                value={metrics.records.totalCount}
                size='small'
                label={t('catalog.records')} />
            </div>
          ) : (
            <div>{t('catalog.empty')}</div>
          )}
        </div>

        <style jsx>{`
          @import 'colors';

          a {
            display: block;
            padding: 16px 22px;
            text-align: left;
            position: relative;
            color: $darkgrey;
            border-radius: 5px;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);

            background: $white;
            background: linear-gradient(180deg, #fdfdf8, $white);

            &:hover {
              color: inherit;
              box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
            }
          }

          .obsolete {
            position: absolute;
            color: $yellow;
            right: 12px;
            top: 9px;
            font-size: 2em;
          }

          .title {
            font-size: 1.4em;
            line-height: 1.2em;
            padding-right: 1em;

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
            margin-top: 2.8em;
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
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate()(CatalogPreview)
