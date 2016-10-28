import React from 'react'
import HarvestRow from '../HarvestRow/HarvestRow'

const HarvestsTable = ({harvests, catalog}) => {
    const styles = {
      table: {
        maxWidth: '40em',
      },
    }
    return (
      <table style={styles.table}>

        <thead>
          <tr>
            <th>Status</th>
            <th>Records</th>
            <th>Finished</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {harvests.map((harvest, idx) => <HarvestRow key={idx} harvest={harvest} catalog={catalog} />)}
        </tbody>

      </table>
    )
}

export default HarvestsTable
