import React from 'react'
import { Link } from 'react-router'
import { doneSince } from '../../helpers/doneSince'

const HarvestRow = ({harvest, catalog}) => {
  const color = harvest.status === 'successful' ? 'green' : 'red'

  return (
    <tr>
      <td>
        <div className={`ui ${color} circular label`} >
          {harvest.status}
        </div>
      </td>
      <td>{harvest.itemsFound}</td>
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
