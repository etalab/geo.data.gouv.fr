import React from 'react'
import DatasetChecklist from './DatasetChecklist'
import './DatasetDetail.css'
import { doneSince } from '../../helpers/doneSince'

const styles = {
  resume: {
    display: 'flex',
    flexDirection: 'column',
  },
  infos: {
    display: 'flex',
  },
}

const DatasetSection = ({dataset}) => {
  const type = dataset.metadata.type || 'unknown'
  const license = dataset.metadata.license || 'not determined'
  const revisionDate = doneSince(dataset.revisionDate)

  return (
    <div style={styles.resume} className="dataset-section">
      <h1 className="dataset-title">{dataset.metadata.title}</h1>
      <DatasetChecklist dataset={dataset} />
      <div style={styles.infos} className="infos">
        <div>Type : <span>{type}</span></div>
        <div>Licence : <span>{license}</span></div>
        <div>Last update : <span>{revisionDate}</span></div>
      </div>
      <div>Dataset ID : <span>{dataset.metadata.id}</span></div>
      <p>{dataset.metadata.description}</p>
      <p>Origin of data : {dataset.metadata.lineage}</p>
    </div>
      )
}

export default DatasetSection
