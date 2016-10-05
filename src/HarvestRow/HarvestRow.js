import React, { Component } from 'react'
import { Link } from 'react-router'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import MediaQuery from 'react-responsive'
import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz'

class HarvestRow extends Component {
  render() {
    const color = this.props.harvest.status === "successful" ? "green" : "red"
    const endDate = new Date(this.props.harvest.finished).getTime()
    const hoursDifference = moment(endDate).fromNow()
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
            {this.props.harvest.status}
          </MediaQuery>
          <MediaQuery maxWidth={650}>
            <div className={`ui ${color} circular label`} >
              {this.props.harvest.status === "successful" ? <i className="checkmark icon"/> : <i className="remove icon"/>}
            </div>
          </MediaQuery>
        </TableRowColumn>
        <TableRowColumn>{this.props.harvest.itemsFound}</TableRowColumn>
        <TableRowColumn>{hoursDifference || 'N/A' }</TableRowColumn>
        <TableRowColumn>
          <Link to={`/catalogs/${this.props.catalog.id}/harvest/${this.props.harvest._id}`}>
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
}

export default HarvestRow
