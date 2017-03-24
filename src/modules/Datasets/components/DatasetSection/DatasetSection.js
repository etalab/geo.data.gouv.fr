import React from 'react'

import MarkdownViewer from '../Markdown/MarkdownViewer'

import { doneSince } from '../../../../helpers/doneSince'

import { section, container, head, resume, theme, infos } from './DatasetSection.css'

const DatasetSection = ({ dataset }) => {
  const { type, license, inspireTheme } = dataset.metadata
  const revisionDate = doneSince(dataset.revisionDate)

  return (
    <div className={container}>
      <div className={head}>
        <div className={resume}>
          <h1>{dataset.metadata.title}</h1>
          <div className={infos}>
            <div>Type : <span>{type || 'inconnu'}</span></div>
            <div>Licence : <span>{license || 'non déterminé'}</span></div>
            <div>Dernière mise à jour : <span>{revisionDate}</span></div>
          </div>
        </div>
        <div className={theme}>
          <div><img src={`/assets/inspire-icons/${inspireTheme.id}.svg`} alt='inspire-theme-icon'/></div>
          <div><a href={inspireTheme.uri}>{inspireTheme.label.fr}</a></div>

        </div>
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
