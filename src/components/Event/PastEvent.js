import React from 'react'

import Section from '../Section/Section'

import { event } from './PastEvent.scss'

const PastEvent =  props => {
  const pastEvent = props.event
  const noLinkMessage = pastEvent.linkComingSoon ? 'Compte-rendu bientôt disponible…' : 'Pas de compte-rendu'

  return (
    <Section title={pastEvent.name}>
      <div className={event}>
        <i className="huge file text icon"></i>
        <div>
          <div>{pastEvent.date}</div>
          {pastEvent.link ?
            <div>
              <a href={pastEvent.link}>Télécharger le compte rendu</a>
            </div>
            : <div>{noLinkMessage}</div>
          }
        </div>
      </div>
    </Section>
  )
}

export default PastEvent
