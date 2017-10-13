import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const { GEODATA_API_URL } = process.env

const DatasetHelmet = ({ dataset, hasThumbnails }) => (
  <Helmet title={dataset.metadata.title}>
    <meta name='twitter:title' content={dataset.metadata.title} />
    <meta name='twitter:description' content={dataset.metadata.description} />
    {hasThumbnails && (
      <meta name='twitter:image' content={`${GEODATA_API_URL}/records/${dataset.recordId}/thumbnails/${dataset.metadata.thumbnails[0].originalUrlHash}`} />
    )}
    <meta property='og:title' content={dataset.metadata.title} />
    {hasThumbnails && (
      <meta name='og:image' content={`${GEODATA_API_URL}/records/${dataset.recordId}/thumbnails/${dataset.metadata.thumbnails[0].originalUrlHash}`} />
    )}
    <meta property='og:description' content={dataset.metadata.description} />
  </Helmet>
)

DatasetHelmet.propTypes = {
  hasThumbnails: PropTypes.bool.isRequired,
  dataset: PropTypes.shape({
    recordId: PropTypes.string,
    metadata: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnails: PropTypes.array.isRequired
    }).isRequired
  })
}

export default DatasetHelmet
