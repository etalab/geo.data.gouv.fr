import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import Row from './row'

const Table = ({harvests, catalog, pending, t}) => (
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
        {pending && (
          <Row
            harvest={{
              status: 'pending'
            }}
          />
        )}
        {harvests.length > 0 ? harvests.map((harvest, idx) => (
          <Row
            key={harvest._id}
            catalog={catalog}
            harvest={harvest}
            previousHarvest={harvests[idx + 1]}
          />
        )) : (
          <tr>
            <td colSpan={5}>
              {t('details.harvests.noHarvest')}
            </td>
          </tr>
        )}
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
    _id: PropTypes.string.isRequired
  }).isRequired,

  pending: PropTypes.bool.isRequired,

  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Table)
