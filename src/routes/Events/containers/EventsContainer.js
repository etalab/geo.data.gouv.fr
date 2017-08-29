import React from 'react'

import EventsPage from '../components/EventsPage'

const pastEvents = [
  { name: 'Atelier #1', date: '06/10/2016', link: '/assets/ateliers/synthese_atelier_1.pdf' },
  { name: 'Atelier #2', date: '03/11/2016' },
  { name: 'Atelier #3', date: '09/02/2017', link: '/assets/ateliers/synthese_atelier_3.pdf' },
  { name: 'Atelier #4', date: '09/03/2017', link: '/assets/ateliers/synthese_atelier_4.pdf' },
  { name: 'Atelier #5', date: '18/04/2017', link: '/assets/ateliers/synthese_atelier_5.pdf' },
  { name: 'Atelier #6', date: '18/05/2017', linkComingSoon: true }
]

export default () => (
  <EventsPage pastEvents={pastEvents} />
)
