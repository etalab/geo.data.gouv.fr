import React from 'react'
import moment from 'moment'

import { doneSince } from '../../../../helpers/doneSince'
import { frequencies } from '../../../../helpers/frequencies'
import { topicCategories } from '../../../../helpers/topicCategories'

import { container, histo } from './TechnicalInformations.css'

const TechnicalInformations = ({ dataset }) => {
  const { type, license, updateFrequency, creationDate, revisionDate, equivalentScaleDenominator, spatialResolution, topicCategory } = dataset.metadata
  const createDate = creationDate ? moment(creationDate).format('DD/MM/YYYY') : 'inconnue'

  return (
    <div className={container}>
      <div className={histo}>
        <h4>Cycle de vie de la donnée (selon producteur)</h4>
        <div>Fréquence de mise à jour : <b>{ updateFrequency ? frequencies[updateFrequency] : 'inconnue' }</b></div>
        <div>Date de création : <b>{createDate}</b></div>
        <div>Dernière mise à jour : <b>{revisionDate ? doneSince(revisionDate) : createDate}</b></div>
      </div>
      <div>
        <h4>Autres informations</h4>
          <div>Catégorie du jeu de données : <b>{topicCategories[topicCategory] || 'Non renseignée'}</b></div>
          <div>Type : <b>{type || 'inconnu'}</b></div>
          <div>Licence : <b>{license || 'non déterminé'}</b></div>
          {equivalentScaleDenominator ? <div>Échelle : <b>1 / {equivalentScaleDenominator}</b></div> : null}
          {spatialResolution ? <div>Résolution : <b>{spatialResolution.value} {spatialResolution.unit}</b></div> : null}
      </div>
    </div>
  )
}

export default TechnicalInformations
