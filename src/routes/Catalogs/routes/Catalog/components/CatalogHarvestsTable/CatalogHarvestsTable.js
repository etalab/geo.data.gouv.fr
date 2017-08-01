import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import CatalogHarvestsRow from '../CatalogHarvestsRow'

import styles from './CatalogHarvestsTable.scss'

const CatalogHarvestsTable = ({ harvests, catalogId, harvesting, t }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{t('CatalogHarvestsTable.status')}</th>
          <th className={styles.center}>{t('CatalogHarvestsTable.records')}</th>
          <th className={styles.center}>{t('CatalogHarvestsTable.delta')}</th>
          <th className={styles.center}>{t('CatalogHarvestsTable.date')}</th>
          <th className={styles.right} />
        </tr>
      </thead>

      <tbody>
        {harvesting && (
          <tr>
            <td>
              {t('CatalogHarvestsTable.inProgress')}
            </td>
            <td />
            <td />
            <td />
            <td />
          </tr>
        )}
        {!harvests.length ? (
          <tr>
            <td colSpan={5} className={styles.noResults}>
              {t('CatalogHarvestsTable.noHarvest')}
            </td>
          </tr>
        ) : harvests.map((harvest, idx) => (
          <CatalogHarvestsRow
            key={harvest._id}
            harvest={harvest}
            previousHarvest={harvests[idx + 1]}
            catalogId={catalogId}
          />
        ))}
      </tbody>
    </table>
  )
}

CatalogHarvestsTable.propTypes = {
  harvests: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,

  catalogId: PropTypes.string.isRequired,

  harvesting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('Catalogs.Catalog')(CatalogHarvestsTable)
