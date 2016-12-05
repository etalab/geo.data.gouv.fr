import React from 'react'
import MarkdownViewer from '../Markdown/MarkdownViewer'
import './DatasetDetail.css'
import { doneSince } from '../../helpers/doneSince'
import { theme } from '../../tools'

const styles = {
  resume: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2em',
    color: '#fff',
    backgroundColor: theme.blue,
  },
  infos: {
    display: 'flex',
  },
}

const DatasetSection = ({dataset, style}) => {
  const type = dataset.metadata.type || 'inconnu'
  const license = dataset.metadata.license || 'non déterminé'
  const revisionDate = doneSince(dataset.revisionDate)

  return (
    <div className="dataset-section">
      <div style={styles.resume} >
        <h1 className="dataset-title">{dataset.metadata.title}</h1>
        <div style={styles.infos} className="infos">
          <div>Type : <span>{type}</span></div>
          <div>Licence : <span>{license}</span></div>
          <div>Dernière mise à jour : <span>{revisionDate}</span></div>
        </div>
        <div>Identifiant du jeu de données : <span>{dataset.metadata.id}</span></div>
      </div>

      <div style={style.section}>
        <MarkdownViewer markdown={dataset.metadata.description} />
        <p><b>Origine de la donnée : </b>{dataset.metadata.lineage}</p>
      </div>
    </div>
      )
}

export default DatasetSection
