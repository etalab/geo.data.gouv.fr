import React from 'react'
import { doneSince } from '../../../../helpers/doneSince'

import { container, histo } from './TechnicalInformations.css'

const TechnicalInformations = ({ dataset, technicalInformations }) => {
  const { type, license, id } = dataset.metadata
  const revisionDate = doneSince(dataset.revisionDate)
  // TEST
  const { history, other } = {
      history: {
        updateFrequency: 'Quotidienne',
        creationDate: '10/12/2014',
      },
      other: {
        scale: '1 / 5000',
        resolution: '1m',
      }
    }

  return (
    <div className={container}>
      <div className={histo}>
        <h4>Historique de la donnée</h4>
        {history.updateFrequency ? <div>Fréquence de mise à jour : <b>{history.updateFrequency}</b></div> : null}
        <div>Date de création : <b>{history.creationDate}</b></div>
        <div>Dernière mise à jour : <b>{revisionDate}</b></div>
      </div>
      <div>
        <h4>Autre informations</h4>
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
