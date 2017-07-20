import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import { doneSince } from 'common/helpers/doneSince'

import CatalogHarvestsDelta from '../CatalogHarvestsDelta'

import styles from './CatalogHarvestsRow.scss'

const CatalogHarvestsRow = ({ harvest, previousHarvest, catalogId }) => (
  <tr className={styles.row}>
    <td>
      <div className={styles[harvest.status]} >
        {harvest.status === 'successful' ? 'Réussi' : 'Échec'}
      </div>
    </td>
    <td className={styles.center}>
      {harvest.itemsFound}
    </td>
    <td className={styles.center}>
      {previousHarvest && (
        <CatalogHarvestsDelta delta={harvest.itemsFound - previousHarvest.itemsFound} />
      )}
    </td>
    <td className={styles.center}>
      {doneSince(harvest.finished)}
    </td>
    <td className={styles.right}>
      <Link to={`/catalogs/${catalogId}/harvest/${harvest._id}`}>
        Détails
      </Link>
    </td>
  </tr>
)

CatalogHarvestsRow.propTypes = {
  harvest: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    itemsFound: PropTypes.number
  }).isRequired,

  previousHarvest: PropTypes.shape({
    itemsFound: PropTypes.number
  })
}

export default CatalogHarvestsRow
