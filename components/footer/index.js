import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { translate } from 'react-i18next'

import Container from '../container'
import Social from './social'
import Sitemap from './sitemap'

const Footer = ({ t }) => (
  <footer>
    <Container>
      <div className='content'>
        <div>
          <img src='/static/images/etalab.png' />
          <Social />
        </div>
        <Sitemap />
      </div>
    </Container>

    <style jsx>{`
      @import 'colors';

      footer {
        background: $black;
        color: $white;
        padding: 2em 0;
        line-height: 2em;
      }

      .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 551px) {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `}</style>
  </footer>
)

Footer.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(Footer)
