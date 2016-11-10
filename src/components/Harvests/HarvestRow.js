import React from 'react'
import { Link } from 'react-router'
import HarvestDelta from './HarvestDelta'
import { doneSince } from '../../helpers/doneSince'

const HarvestRow = ({harvest, catalog, nextHarvest}) => {
  const color = harvest.status === 'successful' ? 'green' : 'red'

  return (
    <tr>
      <td>
        <div className={`ui ${color} circular label`} >
          {harvest.status}
        </div>
      </td>
      <td>{harvest.itemsFound}</td>
      <td><HarvestDelta delta={harvest.itemsFound - nextHarvest.itemsFound}/></td>
      <td>{doneSince(harvest.finished)}</td>
      <td>
        <Link to={`/catalogs/${catalog.id}/harvest/${harvest._id}`}>
          More
        </Link>
      </td>
    </tr>
      )
}

export default HarvestRow
