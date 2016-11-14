import React from 'react'
import HarvestRow from './HarvestRow'

const HarvestsTable = ({harvests, catalog}) => {
    const styles = {
      table: {
        maxWidth: '40em',
        width: '100%'
      },
      th: {
        textAlign: 'left',
      }
    }
    return (
      <table style={styles.table}>

        <thead>
          <tr>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Records</th>
            <th style={styles.th}>Delta</th>
            <th style={styles.th}>Finished</th>
            <th style={styles.th}></th>
          </tr>
        </thead>

        <tbody>
          {harvests.map((harvest, idx) => <HarvestRow key={idx} harvest={harvest} previousHarvest={harvests[idx + 1] || 0} catalog={catalog} />)}
        </tbody>

      </table>
    )
}

export default HarvestsTable
