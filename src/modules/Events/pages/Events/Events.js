import React from 'react'

import DocumentTitle from 'react-document-title'

import EventbriteWidget from '../../../../components/Event/EventbriteWidget'
import PastEvent from '../../../../components/Event/PastEvent'

import { events, eventsList, pastEventsList } from './Events.css'

const pastEvents = [
  {name: 'Atelier #1', date: '06/10/2016', link: 'https://github.com/sgmap/inspire/files/838072/1489399578890.pdf'},
  {name: 'Atelier #3', date: '09/02/2017', link: 'https://github.com/sgmap/inspire/files/838076/Synthese.atelier.3.pdf'},
  {name: 'Atelier #4', date: '09/03/2017', link: ''},
]

const Events = () => {

  return (
    <DocumentTitle title={'Événements'}>
      <div className={events}>

        <h1>Événements à venir</h1>
        <div className={eventsList}>
          <EventbriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=32256259340"/>
          <EventbriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=32842679338"/>
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
