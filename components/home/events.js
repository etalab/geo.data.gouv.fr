import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Link from '../link'
import Section from './section'

const Events = ({ t }) => (
  <Section title={t('eventsSectionTitle')}>
    <Link href='/events'>
      <a>{t('eventsLink')}</a>
    </Link>

    <style jsx>{`
      @import 'colors';

      a {
        color: $darkgrey;
        display: block;
        margin-top: 1em;
        margin-bottom: 10em;

        &:focus, &:hover {
          color: $black;
        }
      }
    `}</style>
  </Section>
)

Events.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate('home')(Events)
