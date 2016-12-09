import React from 'react'
import { Link } from 'react-router'
import HarvestDelta from './HarvestDelta'
import { theme } from '../../tools'
import { doneSince } from '../../helpers/doneSince'

const styles = {
  successful: {
    color: theme.green
  },
  failed: {
    color: theme.red
  }
}

const HarvestRow = ({harvest, catalog, previousHarvest}) => {
  return (
    <tr>
      <td>
        <div style={styles[harvest.status]} >
          {harvest.status === 'successful' ? 'Réussi' : 'En échec'}
        </div>
      </td>
      <td>{harvest.itemsFound}</td>
      <td><HarvestDelta delta={harvest.itemsFound - previousHarvest.itemsFound}/></td>
      <td>{doneSince(harvest.finished)}</td>
      <td>
        <Link to={`/catalogs/${catalog._id}/harvest/${harvest._id}`}>
          Détails
        </Link>
      </td>
    </tr>
      )
}

export default HarvestRow
