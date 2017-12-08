import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'
import { translate } from 'react-i18next'

import { sortByScore } from '../../lib/catalog'

import withFetch from '../hoc/with-fetch'

import Link from '../link'
import CatalogPreview from '../catalog-preview'

const Catalogs = ({ catalogs, t }) => {
  const highlighted = sortByScore(catalogs).slice(
    0,
    Math.min(3, catalogs.length)
  )

  return (
    <div>
      <div className='catalogs'>
        {highlighted.map(catalog => (
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
    </div>
  )
}

Catalogs.propTypes = {
  catalogs: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,

  t: PropTypes.func.isRequired
}

export default flowRight(
  withFetch(data => ({
    catalogs: data
  }), {
    Loader: translate()(({ t }) => (
      <div>
        {t('loading')}

        <style jsx>{`
          @import 'colors';

          div {
            color: $darkgrey;
          }
        `}</style>
      </div>
    ))
  }),
  translate('home')
)(Catalogs)
