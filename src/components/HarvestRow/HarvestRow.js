import React from 'react'
import { Link } from 'react-router'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton';
import { doneSince } from '../../helpers/doneSince'

const HarvestRow = ({harvest, catalog}) => {
  const color = harvest.status === 'successful' ? 'green' : 'red'

  return (
    <TableRow hoverable={true}>
      <TableRowColumn>
        <div className={`ui ${color} circular label`} >
          {harvest.status}
        </div>
      </TableRowColumn>
      <TableRowColumn>{harvest.itemsFound}</TableRowColumn>
      <TableRowColumn>{doneSince(harvest.finished)}</TableRowColumn>
      <TableRowColumn>
        <Link to={`/catalogs/${catalog.id}/harvest/${harvest._id}`}>
          <RaisedButton label="More" primary={true} />
        </Link>
      </TableRowColumn>
    </TableRow>
      )
}

export default HarvestRow
