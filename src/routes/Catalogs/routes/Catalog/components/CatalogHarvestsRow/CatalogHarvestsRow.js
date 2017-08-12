import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'

import { doneSince } from 'common/helpers/doneSince'

import CatalogHarvestsDelta from '../CatalogHarvestsDelta'

import styles from './CatalogHarvestsRow.scss'

const CatalogHarvestsRow = ({ harvest, previousHarvest, catalogId, t }) => (
  <tr className={styles.row}>
    <td>
      <div className={styles[harvest.status]} >
        {harvest.status === 'successful' ? t('CatalogHarvestsRow.success') : t('CatalogHarvestsRow.fail')}
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
        {t('CatalogHarvestsRow.details')}
      </Link>
    </td>
  </tr>
)

CatalogHarvestsRow.propTypes = {
  catalogId: PropTypes.string.isRequired,

  harvest: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    itemsFound: PropTypes.number
  }).isRequired,

  previousHarvest: PropTypes.shape({
    itemsFound: PropTypes.number
  }),

  t: PropTypes.func.isRequired
}

export default translate('Catalogs.Catalog')(CatalogHarvestsRow)
