import React from 'react'
import DocumentTitle from 'react-document-title'

import Event from '../Event'

import styles from './EventsPage.scss'

const EventsPage = ({ pastEvents }) => (
  <DocumentTitle title={'Événements'}>
    <div className={styles.events}>

      <h1>Événements à venir</h1>
      <div className={styles.eventsList}>
        Aucun événement programmé pour le moment.
      </div>

      <h1>Événements passés</h1>
      <div className={styles.pastEventsList}>
        {pastEvents.map((event, idx) => (
          <Event key={idx} event={event} />
        ))}
      </div>
    </div>
  </DocumentTitle>
)

export default EventsPage
