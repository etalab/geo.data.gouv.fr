import React from 'react'
import PropTypes from 'prop-types'

import styles from './Event.scss'

const Event = ({ event }) => (
  <div className={styles.container}>
    <h3 className={styles.title}>
      {event.name}
    </h3>
    <div className={styles.event}>
      <i className='huge file text icon' />
      <div>
        <div>{event.date}</div>
        {event.link ? (
          <div>
            <a href={event.link}>Télécharger le compte rendu</a>
          </div>
        ) : (
          <div>
            {event.linkComingSoon ? 'Compte-rendu bientôt disponible…' : 'Pas de compte-rendu'}</div>
        )}
      </div>
    </div>
  </div>
)

Event.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    link: PropTypes.string,
    linkComingSoon: PropTypes.bool
  }).isRequired
}

Event.defaultProps = {
  linkComingSoon: false
}

export default Event
