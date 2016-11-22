import React from 'react'
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
  const type = dataset.metadata.type || 'inconnu'
  const license = dataset.metadata.license || 'non déterminé'
  const revisionDate = doneSince(dataset.revisionDate)

  return (
    <div style={styles.resume} className="dataset-section">
      <h1 className="dataset-title">{dataset.metadata.title}</h1>
      <div style={styles.infos} className="infos">
        <div>Type : <span>{type}</span></div>
        <div>License : <span>{license}</span></div>
        <div>Dernière mise à jour : <span>{revisionDate}</span></div>
      </div>
      <div>Identifiant du jeu de données : <span>{dataset.metadata.id}</span></div>
      <p>{dataset.metadata.description}</p>
      <p>Origine de la donnée : {dataset.metadata.lineage}</p>
    </div>
      )
}

export default DatasetSection
