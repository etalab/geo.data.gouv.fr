import React from 'react'

import DocumentTitle from 'react-document-title'

import EventbriteWidget from '../../../../components/Event/EventbriteWidget'
import PastEvent from '../../../../components/Event/PastEvent'

import { events, eventsList, pastEventsList } from './Events.css'

const pastEvents = [
  {name: 'Atelier #1', date: '06/10/2016', link: '/assets/ateliers/synthese_atelier_1.pdf'},
  {name: 'Atelier #3', date: '09/02/2017', link: '/assets/ateliers/synthese_atelier_3.pdf'},
  {name: 'Atelier #4', date: '09/03/2017', link: '/assets/ateliers/synthese_atelier_4.pdf'},
  {name: 'Atelier #5', date: '18/04/2017', link: ''},
]

const Events = () => {

  return (
    <DocumentTitle title={'Événements'}>
      <div className={events}>

        <h1>Événements à venir</h1>
        <div className={eventsList}>
          <EventbriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=32842679338"/>
          <EventbriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=33885350997"/>
        </div>

        <h1>Événements passés</h1>
        <div className={pastEventsList}>
          {pastEvents.map((event, idx) => <PastEvent key={idx} name={event.name} date={event.date} link={event.link}/>)}
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Events
