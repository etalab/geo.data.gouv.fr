import React from 'react'
import PropTypes from 'prop-types'
import { intersectionWith } from 'lodash'

import withFetch from '../hoc/with-fetch'

import CatalogPreview from '../catalog-preview'

const SourceCatalogs = ({ organization, catalogs }) => {
  const sourceCatalogs = intersectionWith(
    catalogs,
    organization.sourceCatalogs,
    (catalog, id) => catalog._id === id
  )

  return (
    <div>
      {sourceCatalogs.map(catalog => (
        <div key={catalog._id} className='catalog'>
          <CatalogPreview catalog={catalog} />
        </div>
      ))}

      <style jsx>{`
        .catalog {
          margin-bottom: 1.2em;

          &:last-child {
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  )
}

SourceCatalogs.propTypes = {
  organization: PropTypes.shape({
    sourceCatalogs: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,

  catalogs: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired
}

export default withFetch(
  ([ organization, catalogs ]) => ({
    organization,
    catalogs
  })
)(SourceCatalogs)
