import React from 'react'
import Link from 'next/link'
import { translate } from 'react-i18next'

import colors from '../../styles/colors'

import Section from './section'
import CatalogPreview from '../catalog-preview'

const Catalogs = ({ catalogs, t }) => (
  <Section title={t('catalogsSectionTitle')}>
    <ul className='catalogs'>
      {catalogs.map(catalog => (
        <li key={catalog._id}>
          <CatalogPreview catalog={catalog} />
        </li>
      ))}
    </ul>

    <Link href='/catalogs'>
      <a>{t('catalogsLink')}</a>
    </Link>

    <style jsx>{`
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0;
      }

      li {
        margin: 10px 20px;
        display: block;
      }

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
})(Catalogs)
