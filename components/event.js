import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {translate} from 'react-i18next'

import CalendarIcon from 'react-icons/lib/fa/calendar-check-o'

import Button from './button'

const Event = ({event, t}) => (
  <div className='event'>
    <div className='icon'>
      <CalendarIcon />
    </div>
    <div>
      <h3>{event.name}</h3>
      <div>{moment(event.date).format('LL')}</div>
      {event.subscribe ?
        <Button href={event.subscribe}>
          Inscription
        </Button> :
        event.link ? (
          <div>
            <a href={event.link} download>{t('event.download')}</a>
          </div>
        ) : (
          <div>
            {event.linkComingSoon ?
              t('event.soonAvailable') :
              t('event.noReport')
            }
          </div>
        )
      }
    </div>

    <style jsx>{`
      @import 'colors';

      .event {
        border: 1px solid $lightgrey;
        padding: 1.4em 2em;
        border-radius: 2px;
        display: flex;
        align-items: center;

        @media (max-width: 551px) {
          padding: 1em 1.4em;
        }
      }

      h3 {
        margin-bottom: 0.4rem;
      }

      .icon {
        font-size: 3em;
        margin-right: 2rem;

        @media (max-width: 551px) {
          font-size: 2em;
          margin-right: 1.4rem;
        }
      }
    `}</style>
  </div>
)

Event.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    link: PropTypes.string,
    subscribe: PropTypes.string,
    linkComingSoon: PropTypes.bool
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('events')(Event)
