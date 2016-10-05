import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import HarvestRow from '../HarvestRow/HarvestRow'

const HarvestsTable = ({harvests, catalog}) => {
    const styles = {
      table: {
        maxWidth: '40em',
      },
    }
    return (
      <Table style={styles.table}>

        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Records</TableHeaderColumn>
            <TableHeaderColumn>Finished</TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={true}
          >
          {harvests.map((harvest, idx) => <HarvestRow key={idx} harvest={harvest} catalog={catalog} />)}
        </TableBody>

      </Table>
    )
}

export default HarvestsTable
