import React from 'react'
import moment from 'moment'

import { doneSince } from '../../../../helpers/doneSince'
import { frequencies } from '../../../../helpers/frequencies'

import { container, histo } from './TechnicalInformations.css'

const TechnicalInformations = ({ dataset }) => {
  const { createdAt, updatedAt } = dataset
  const { type, license, updateFrequency, id } = dataset.metadata
  const revisionDate = doneSince(updatedAt)
  const other = {} // Waiting for data

  return (
    <div className={container}>
      <div className={histo}>
        <h4>Historique de la donnée</h4>
        {updateFrequency ? <div>Fréquence de mise à jour : <b>{frequencies[updateFrequency]}</b></div> : null}
        <div>Date de création : <b>{moment(createdAt).format('DD/MM/YYYY')}</b></div>
        <div>Dernière mise à jour : <b>{revisionDate}</b></div>
      </div>
      <div>
        <h4>Autres informations</h4>
          <div>Type : <b>{type || 'inconnu'}</b></div>
          <div>Licence : <b>{license || 'non déterminé'}</b></div>
          {other.scale ? <div>Échelle : <b>{other.scale}</b></div> : null}
          {other.resolution ? <div>Résolution : <b>{other.resolution}</b></div> : null}
          <div>Identifiant du jeu de données : <b>{id}</b></div>
      </div>
    </div>
  )
}

export default TechnicalInformations
