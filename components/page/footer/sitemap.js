import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { translate } from 'react-i18next'

const Sitemap = ({ t }) => (
  <ul className='links'>
    <li><h2>geo.data.gouv.fr</h2></li>
    <li>
      <Link href='/legal'>
        <a>
          {t('components.Footer.legal')}
        </a>
      </Link>
    </li>

    <style jsx>{`
      @import 'colors';

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      h2 {
        margin-top: 0;
        margin-bottom: 0.5em;
      }

      a {
        color: inherit;

        &:hover {
          text-decoration: underline;
        }
      }
    `}</style>
  </ul>
)

Sitemap.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(Sitemap)
