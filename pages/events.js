import React from 'react'
import PropTypes from 'prop-types'
import {flowRight} from 'lodash'

import attachI18n from '../components/hoc/attach-i18n'
import attachSession from '../components/hoc/attach-session'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'
import Box from '../components/box'
import Event from '../components/event'

const nextEvent = null

const pastEvents = [
  {name: 'Atelier #9', date: new Date(2018, 6, 12)},
  {name: 'Atelier #8', date: new Date(2018, 4, 22)},
  {name: 'Atelier #7', date: new Date(2017, 11, 12)},
  {name: 'Atelier #6', date: new Date(2017, 4, 18)},
  {name: 'Atelier #5', date: new Date(2017, 3, 18), link: '/static/files/events/synthese_atelier_5.pdf'},
  {name: 'Atelier #4', date: new Date(2017, 2, 9), link: '/static/files/events/synthese_atelier_4.pdf'},
  {name: 'Atelier #3', date: new Date(2017, 1, 9), link: '/static/files/events/synthese_atelier_3.pdf'},
  {name: 'Atelier #2', date: new Date(2016, 10, 3)},
  {name: 'Atelier #1', date: new Date(2016, 9, 6), link: '/static/files/events/synthese_atelier_1.pdf'}
]

const EventsPage = ({t, tReady}) => (
  <Page ready={tReady}>
    {() => (
      <React.Fragment>
        <Meta title={t('title')} />

        <Content clouds>
          <Container>
            <Box>
              <h1>{t('nextEvents')}</h1>
              <div className='empty'>
                {nextEvent ? (
                  <Event event={nextEvent} />
                ) : t('noEvents')}
              </div>

              <h1>{t('previousEvents')}</h1>
              <section>
                {pastEvents.map(event => (
                  <div key={event.name}>
                    <Event event={event} />
                  </div>
                ))}
              </section>
            </Box>
          </Container>
        </Content>

        <style jsx>{`
          h1 {
            font-size: 1.8rem;
            font-weight: 500;
            margin-bottom: 1em;
          }

          .empty {
            margin-bottom: 3em;
          }

          section {
            display: flex;
            flex-wrap: wrap;
            margin: 1em -0.6em 0 -0.6em;

            div {
              margin: 0 0.6em 1em 0.6em;
              width: calc(33.33% - 1.2em);

              @media (max-width: 960px) {
                width: calc(50% - 1.2em);
              }

              @media (max-width: 767px) {
                width: calc(100% - 1.2em);
              }

              @media (max-width: 551px) {
                height: auto;
              }
            }
          }
        `}</style>
      </React.Fragment>
    )}
  </Page>
)

EventsPage.propTypes = {
  t: PropTypes.func.isRequired,
  tReady: PropTypes.bool.isRequired
}

export default flowRight(
  attachI18n('events'),
  attachSession
)(EventsPage)
