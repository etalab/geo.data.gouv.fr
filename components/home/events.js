import React from 'react'
import Link from 'next/link'
import { translate } from 'react-i18next'

import colors from '../../styles/colors'

import Section from './section'

const Events = ({ t }) => (
  <Section title={t('eventsSectionTitle')}>
    <Link href='/events'>
      <a>{t('eventsLink')}</a>
    </Link>

    <style jsx>{`
      a {
        color: ${colors.darkgrey};
      }

      a:focus,
      a:hover {
        color: #000;
      }
    `}</style>
  </Section>
)

export default translate('home', {
  wait: process.browser
})(Events)
