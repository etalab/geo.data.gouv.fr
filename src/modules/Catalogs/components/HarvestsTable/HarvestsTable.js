import React from 'react'

import HarvestRow from './HarvestRow'

import style from './HarvestsTable.css'

const HarvestsTable = ({harvests, catalog}) => {
    return (
      <table className={style.table}>

        <thead>
          <tr>
            <th>Statut</th>
            <th>Enregistrements</th>
            <th>Delta</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {harvests.map((harvest, idx) => <HarvestRow key={idx} harvest={harvest} previousHarvest={harvests[idx + 1] || 0} catalog={catalog} />)}
        </tbody>

      </table>
    )
}

export default HarvestsTable
