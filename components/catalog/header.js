import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Header = ({ catalog, t }) => (
  <div>
    <h1>{catalog.name}</h1>

    <a href={catalog.service.location} rel='noopener noreferrer' target='_blank'>
      {t('details.header.catalogService')}
    </a>

    <style jsx>{`
      div {
        display: flex;
        justify-content: space-between;

        @media (max-width: 960px) {
          flex-direction: column;
        }
      }

      h1 {
        font-size: 1.8rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }
    `}</style>
  </div>
)

Header.propTypes = {
  catalog: PropTypes.shape({
    name: PropTypes.string.isRequired,
    service: PropTypes.shape({
      location: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Header)
