import React from 'react'
import { Link } from 'react-router'

import HarvestDelta from './HarvestDelta'

import { doneSince } from '../../../../helpers/doneSince'

const displayStyle = {
  successful: {
    color: 'green'
  },
  failed: {
    color: 'red'
  }
}

const HarvestRow = ({harvest, catalog, previousHarvest}) => {
  return (
    <tr>
      <td>
        <div style={displayStyle[harvest.status]} >
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
