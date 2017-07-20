import React from 'react'
import PropTypes from 'prop-types'

import CatalogHarvestsRow from '../CatalogHarvestsRow'

import styles from './CatalogHarvestsTable.scss'

const CatalogHarvestsTable = ({ harvests, catalogId, harvesting }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Statut</th>
          <th className={styles.center}>Enregistrements</th>
          <th className={styles.center}>Delta</th>
          <th className={styles.center}>Date</th>
          <th className={styles.right}></th>
        </tr>
      </thead>

      <tbody>
        {harvesting && (
          <tr>
            <td>
              En cours…
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
              Aucun moissonage réalisé…
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

  harvesting: PropTypes.bool.isRequired
}

export default CatalogHarvestsTable

