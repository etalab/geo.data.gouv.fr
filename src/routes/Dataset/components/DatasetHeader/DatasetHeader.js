import React from 'react'
import PropTypes from 'prop-types'

import MarkdownPreview from 'common/components/MarkdownPreview'

import { doneSince } from 'common/helpers/doneSince'
import { getLicense } from 'common/helpers/dataGouvChecks'

import styles from './DatasetHeader.scss'

const DatasetHeader = ({ dataset }) => {
  const { title, description, type, purpose, lineage, inspireTheme } = dataset.metadata

  const revisionDate = doneSince(dataset.revisionDate)
  const license = getLicense(dataset.metadata.license)

  return (
    <div className={styles.container}>
      <div className={inspireTheme ? styles.inspireThemeHead : styles.head}>
        <div className={styles.resume}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.infos}>
            <div>
              Type : <span>{type || 'inconnu'}</span>
            </div>
            <div>
              Licence : <span>{license.name ? (
                <a href={license.link} target='_blank'>{license.name}</a>
              ) : license}</span>
            </div>
            <div>
              Dernière mise à jour : <span>{revisionDate}</span>
            </div>
          </div>
        </div>

        {inspireTheme && (
          <div className={styles.theme}>
            <div>
              <img src={`/assets/inspire-icons/${inspireTheme.id}.svg`} alt='inspire-theme-icon'/>
            </div>
            <div>
              <a href={inspireTheme.uri} target='_blank'>{inspireTheme.label.fr}</a>
            </div>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div>
          {description && (
            <MarkdownPreview markdown={description} />
          )}
          <p>
            <b>Objectif :</b> {purpose || 'Non renseigné'}
          </p>
          <p>
            <b>Origine de la donnée :</b> {lineage || 'Non renseignée'}
          </p>
        </div>
      </div>
    </div>
  )
}

DatasetHeader.PropTypes = {
  dataset: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    lineage: PropTypes.string.isRequired,
    inspireTheme: PropTypes.string
  }).isRequired
}

export default DatasetHeader
