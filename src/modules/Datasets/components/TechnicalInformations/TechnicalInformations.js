import React from 'react'
import moment from 'moment'

import { doneSince } from '../../../../helpers/doneSince'
import { frequencies } from '../../../../helpers/frequencies'

import { container, histo } from './TechnicalInformations.css'

const TechnicalInformations = ({ dataset }) => {
  const { type, license, updateFrequency, creationDate, revisionDate, equivalentScaleDenominator } = dataset.metadata
  const createDate = creationDate ? moment(creationDate).format('DD/MM/YYYY') : 'inconnue'
  const neededData = {}

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
          <div>Type : <b>{type || 'inconnu'}</b></div>
          <div>Licence : <b>{license || 'non déterminé'}</b></div>
          {equivalentScaleDenominator ? <div>Échelle : <b>1 / {equivalentScaleDenominator}</b></div> : null}
          {neededData.resolution ? <div>Résolution : <b>{neededData.resolution}</b></div> : null}
      </div>
    </div>
  )
}

export default TechnicalInformations
