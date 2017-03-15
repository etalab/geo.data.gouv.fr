import React from 'react'

import Section from '../Section/Section'

import { event } from './PastEvent.css'

const PastEvent = ({ name, date, link }) => {
  return (
    <Section title={name}>
      <div className={event}>
        <i className="huge file text icon"></i>
        <div>
          <div>{date}</div>
          {link ?
            <div>
              <a href={link}>Télécharger le compte rendu</a>
            </div>
            : <div>Bientôt disponible...</div>
          }
        </div>
      </div>
    </Section>
  )
}

export default PastEvent
