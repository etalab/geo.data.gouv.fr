import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Link from '../link'

const Header = ({ catalog, t }) => (
  <div>
    <h1>{catalog.name}</h1>

    <Link href={`/catalog?cid=${catalog._id}`} as={`/catalogs/${catalog._id}`} prefetch>
      <a>
        {t('harvest.header.backToCatalog')}
      </a>
    </Link>

    <style jsx>{`
      div {
        display: flex;
        justify-content: space-between;
        margin: 0.2em 0 1em;

        @media (max-width: 960px) {
          flex-direction: column;
        }
      }

      h1 {
        font-size: 1.8rem;
        font-weight: 500;
        margin-bottom: 1em;
      }
    `}</style>
  </div>
)

Header.propTypes = {
  catalog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Header)
