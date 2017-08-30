import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import styles from './Event.scss'

const Event = ({ event, t }) => (
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
            <a href={event.link}>{t('Event.download')}</a>
          </div>
        ) : (
          <div>
            {event.linkComingSoon
              ? t('Event.soonAvailable')
              : t('Event.noReport')
            }
          </div>
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
  }).isRequired,

  t: PropTypes.func.isRequired
}

Event.defaultProps = {
  linkComingSoon: false
}

export default translate('Events')(Event)
