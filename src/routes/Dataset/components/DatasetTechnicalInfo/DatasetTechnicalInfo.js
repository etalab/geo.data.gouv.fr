import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { doneSince } from 'common/helpers/doneSince'
import { getLicense } from 'common/helpers/dataGouvChecks'

import { frequencies } from './frequencies'
import { topicCategories } from './topics'

import styles from './DatasetTechnicalInfo.scss'

const DatasetTechnicalInfo = ({ dataset, status }) => {
  const {
    type,
    updateFrequency,
    creationDate,
    revisionDate,
    topicCategory,
    equivalentScaleDenominator,
    spatialResolution
  } = dataset.metadata

  const frequency = updateFrequency ? frequencies[updateFrequency] : 'inconnue'
  const createDate = creationDate ? moment(creationDate).format('DD/MM/YYYY') : 'inconnue'
  const license = getLicense(dataset.metadata.license)

  return (
    <div className={styles.container}>
      <div>
        <h4>Cycle de vie de la donnée (selon producteur)</h4>

        <div>Fréquence de mise à jour : <b>{frequency}</b></div>
        <div>Date de création : <b>{createDate}</b></div>
        <div>Dernière mise à jour : <b>{revisionDate ? doneSince(revisionDate) : createDate}</b></div>
      </div>

      <div className={styles.other}>
        <h4>Autres informations</h4>

          <div>Catégorie du jeu de données : <b>{topicCategories[topicCategory] || 'non renseignée'}</b></div>
          <div>Type : <b>{type || 'inconnu'}</b></div>

          <div>
            Licence : {license.name ? (
              <a href={license.link}>{license.name}</a>
            ) : (
              <b>license</b>
            )}
          </div>

          {status && (
            <div>État : <b>{status.status}</b></div>
          )}

          {equivalentScaleDenominator && (
            <div>Échelle : <b>1 / {equivalentScaleDenominator}</b></div>
          )}

          {spatialResolution && (
            <div>Résolution : <b>{spatialResolution.value} {spatialResolution.unit}</b></div>
          )}
      </div>
    </div>
  )
}

DatasetTechnicalInfo.propTypes = {
  dataset: PropTypes.shape({
    metadata: PropTypes.shape({
      type: PropTypes.string.isRequired,
      updateFrequency: PropTypes.string,
      creationDate: PropTypes.string,
      revisionDate: PropTypes.string,
      topicCategory: PropTypes.string,
      equivalentScaleDenominator: PropTypes.number,
      spatialResolution: PropTypes.shape({
        value: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired
      })
    }).isRequired,

    status: PropTypes.shape({
      status: PropTypes.string.isRequired
    })
  }).isRequired
}

export default DatasetTechnicalInfo
