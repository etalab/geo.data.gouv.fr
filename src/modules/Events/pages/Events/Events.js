import React from 'react'

import DocumentTitle from 'react-document-title'

import EventBriteWidget from '../../../../components/Event/EventBriteWidget'

import { events, eventsList } from './Events.css'

const Events = () => {
  return (
    <DocumentTitle title={'Événements'}>
      <div className={events}>
        <h1>Événements à venir</h1>
        <div className={eventsList}>
          <EventBriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=31410303062"/>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Events
