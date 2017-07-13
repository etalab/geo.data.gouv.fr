import React from 'react'

import DocumentTitle from 'react-document-title'

import PastEvent from '../../../../components/Event/PastEvent'

import { events, eventsList, pastEventsList } from './Events.scss'

const pastEvents = [
  {name: 'Atelier #1', date: '06/10/2016', link: '/assets/ateliers/synthese_atelier_1.pdf'},
  {name: 'Atelier #2', date: '03/11/2016' },
  {name: 'Atelier #3', date: '09/02/2017', link: '/assets/ateliers/synthese_atelier_3.pdf'},
  {name: 'Atelier #4', date: '09/03/2017', link: '/assets/ateliers/synthese_atelier_4.pdf'},
  {name: 'Atelier #5', date: '18/04/2017', link: '/assets/ateliers/synthese_atelier_5.pdf' },
  {name: 'Atelier #6', date: '18/05/2017', linkComingSoon: true },
]

const Events = () => {

  return (
    <DocumentTitle title={'Événements'}>
      <div className={events}>

        <h1>Événements à venir</h1>
        <div className={eventsList}>
          Aucun événement programmé pour le moment.
        </div>

        <h1>Événements passés</h1>
        <div className={pastEventsList}>
          {pastEvents.map((event, idx) => <PastEvent key={idx} event={event} />)}
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Events
