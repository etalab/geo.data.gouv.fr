import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Link from '../link'
import Section from './section'
import CatalogPreview from '../catalog-preview'

const Catalogs = ({ catalogs, t }) => (
  <Section title={t('catalogsSectionTitle')}>
    <div className='catalogs'>
      {catalogs.map(catalog => (
        <div key={catalog._id} className='catalog'>
          <CatalogPreview catalog={catalog} />
        </div>
      ))}
    </div>

    <Link href='/catalogs'>
      <a>{t('catalogsLink')}</a>
    </Link>

    <style jsx>{`
      @import 'colors';

      .catalogs {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        @media (max-width: 551px) {
          flex-direction: column;
        }
      }

      .catalog {
        margin: 10px;
        width: 360px;

        @media (max-width: 551px) {
          width: 100%;
          margin: 10px 0;
        }
      }

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

Catalogs.propTypes = {
  catalogs: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('home')(Catalogs)
