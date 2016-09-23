import React from 'react'
import moment from 'moment'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import {TableRow, TableRowColumn} from 'material-ui/Table'

const Harvest = ({harvest, catalog}) => {
  const color = harvest.status === "successful" ? "green" : "red"
  const endDate = new Date(harvest.finished).getTime()
  const hoursDifference = moment(endDate).fromNow()

  return (
    <TableRow hoverable={true}>
      <TableRowColumn><div className={`ui ${color} circular label`}>{harvest.status}</div></TableRowColumn>
      <TableRowColumn>{harvest.itemsFound}</TableRowColumn>
      <TableRowColumn>{hoursDifference || 'N/A' }</TableRowColumn>
      <TableRowColumn>
        <Link to={`/catalogs/${catalog.id}/harvest/${harvest._id}`}><RaisedButton label="Details" primary={true} /></Link>
      </TableRowColumn>
    </TableRow>
      )
}

export default Harvest
