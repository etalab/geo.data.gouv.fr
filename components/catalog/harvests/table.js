import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Row from './row'

const Table = ({ harvests, catalog, t }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th className='status' />
          <th>{t('details.harvests.table.records')}</th>
          <th>{t('details.harvests.table.delta')}</th>
          <th>{t('details.harvests.table.date')}</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {catalog.service.sync.pending && (
          <Row
            catalog={catalog}
            harvest={{
              status: 'pending'
            }}
          />
        )}
        {!harvests.length ? (
          <tr>
            <td colSpan={5}>
              {t('details.harvests.noHarvest')}
            </td>
          </tr>
        ) : harvests.map((harvest, idx) => (
          <Row
            key={harvest._id}
            catalog={catalog}
            harvest={harvest}
            previousHarvest={harvests[idx + 1]}
          />
        ))}
      </tbody>
    </table>

    <style jsx>{`
        @import 'colors';

        div {
          overflow-x: auto;
          white-space: nowrap;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        th {
          text-align: center;
          padding: 0.3em 0.6em;
          border-bottom: 1px solid $lightgrey;
        }

        .status {
          width: 30px;
        }
    `}</style>
  </div>
)

Table.propTypes = {
  harvests: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,

  catalog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    service: PropTypes.shape({
      sync: PropTypes.shape({
        pending: PropTypes.bool.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Table)
