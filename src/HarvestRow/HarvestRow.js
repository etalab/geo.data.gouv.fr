import React from 'react'
import { Link } from 'react-router'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import MediaQuery from 'react-responsive'
import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

function doneSince(endTime) {
  const endDate = new Date(endTime).getTime()
  return moment(endDate).fromNow()
}

const HarvestRow = ({harvest, catalog}) => {
  const color = harvest.status === "successful" ? "green" : "red"
  const styles = {
    button: {
      minWidth: '',
      fontSize: '2em',
    },
  }

  return (
    <TableRow hoverable={true}>
      <TableRowColumn>
        <MediaQuery style={styles.label} minWidth={651} className={`ui ${color} circular label`} >
          {harvest.status}
        </MediaQuery>
        <MediaQuery maxWidth={650}>
          <div className={`ui ${color} circular label`} >
            {harvest.status === "successful" ? <i className="checkmark icon"/> : <i className="remove icon"/>}
          </div>
        </MediaQuery>
      </TableRowColumn>
      <TableRowColumn>{harvest.itemsFound}</TableRowColumn>
      <TableRowColumn>{doneSince(harvest.finished) || 'N/A' }</TableRowColumn>
      <TableRowColumn>
        <Link to={`/catalogs/${catalog.id}/harvest/${harvest._id}`}>
          <MediaQuery minWidth={651} >
            <RaisedButton label="More" primary={true} />
          </MediaQuery>
          <MediaQuery maxWidth={650} >
            <IconButton>
              <NavigationMoreHoriz />
            </IconButton>
          </MediaQuery>
        </Link>
      </TableRowColumn>
    </TableRow>
      )
}

export default HarvestRow
