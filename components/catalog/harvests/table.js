import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Row from './row'

const Table = ({ harvests, catalog, t }) => {
  return (
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

      <style jsx>{`
        @import 'colors';

        table {
          border-collapse: collapse;
          width: 100%;
        }

        th {
          text-align: center;
          padding: 0.3em;
          border-bottom: 1px solid $lightgrey;
        }

        .status {
          width: 30px;
        }
      `}</style>
    </table>
  )
}

Table.propTypes = {
  harvests: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,

  catalog: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Table)
