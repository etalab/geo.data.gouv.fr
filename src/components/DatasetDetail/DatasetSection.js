import React from 'react'
import './DatasetDetail.css'
import { doneSince } from '../../helpers/doneSince'

const DatasetSection = ({dataset}) => {
  const styles = {
    resume: {
      display: 'flex',
      flexDirection: 'column',
    },
    infos: {
      display: 'flex',
    },
  }
  const type = dataset.metadata.type || 'unknown'
  const license = dataset.metadata.license || 'not determined'
  const revisionDate = doneSince(dataset.revisionDate)
  return (
    <div style={styles.resume} className="dataset-section">
      <h1 className="dataset-title">{dataset.metadata.title}</h1>
      <div style={styles.infos} className="infos">
        <div>Type : <span>{type}</span></div>
        <div>Licence : <span>{license}</span></div>
        <div>Dernière mise à jour de la fiche : <span>{revisionDate}</span></div>
      </div>
      <div>Identifiant technique de la fiche : <span>{dataset.metadata.id}</span></div>
      <h4>{dataset.metadata.description}</h4>
    </div>
      )
}

export default DatasetSection
