import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table'
import Harvest from '../Section/HarvestsSection/Harvest/Harvest'

const HarvestsTable = ({harvests, catalog}) => {

    return (
      <Table>

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
          {harvests.map((harvest, idx) => <Harvest key={idx} harvest={harvest} catalog={catalog} />)}
        </TableBody>

      </Table>
    )
}

export default HarvestsTable
