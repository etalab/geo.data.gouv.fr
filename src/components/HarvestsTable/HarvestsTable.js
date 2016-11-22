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
            <th style={styles.th}>Statut</th>
            <th style={styles.th}>Enregistrements</th>
            <th style={styles.th}>Delta</th>
            <th style={styles.th}>Terminer</th>
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
