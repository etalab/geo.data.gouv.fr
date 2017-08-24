import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import Event from '../Event'

import styles from './EventsPage.scss'

const EventsPage = ({ pastEvents, t }) => (
  <div className={styles.events}>
    <Helmet title={t('EventsPage.documentTitle')} />

    <h1>{t('EventsPage.nextTitle')}</h1>
    <div className={styles.eventsList}>
      {t('EventsPage.noEvents')}
    </div>

    <h1>{t('EventsPage.previousTitle')}</h1>
    <div className={styles.pastEventsList}>
      {pastEvents.map((event, idx) => (
        <Event key={idx} event={event} />
      ))}
    </div>
  </div>
)

EventsPage.propTypes = {
  pastEvents: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
}

export default translate('Events')(EventsPage)
