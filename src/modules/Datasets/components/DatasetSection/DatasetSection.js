import React from 'react'

import MarkdownViewer from '../Markdown/MarkdownViewer'

import { doneSince } from '../../../../helpers/doneSince'

import { section, container, resume, infos } from './DatasetSection.css'

const DatasetSection = ({dataset, style}) => {
  const type = dataset.metadata.type || 'inconnu'
  const license = dataset.metadata.license || 'non déterminé'
  const revisionDate = doneSince(dataset.revisionDate)

  return (
    <div className={container}>
      <div className={resume}>
        <h1>{dataset.metadata.title}</h1>
        <div className={infos}>
          <div>Type : <span>{type}</span></div>
          <div>Licence : <span>{license}</span></div>
          <div>Dernière mise à jour : <span>{revisionDate}</span></div>
        </div>
        <div>Identifiant du jeu de données : <span>{dataset.metadata.id}</span></div>
      </div>

      <div className={section}>
        {!dataset.metadata.description || !dataset.metadata.description.length ?
          <div>Aucune description.</div> :
          <MarkdownViewer markdown={dataset.metadata.description} />
        }
        <p>
          <b>Origine de la donnée : </b>{dataset.metadata.lineage ? dataset.metadata.lineage : 'Non renseignée'}
        </p>
      </div>
    </div>
  )
}

export default DatasetSection
