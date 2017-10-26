import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { translate } from 'react-i18next'

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
