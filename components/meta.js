import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

const SITE_NAME = 'geo.data.gouv.fr'

const Meta = ({ title, description, image }) => (
  <Head>
    <title>{title} | {SITE_NAME}</title>
    <meta name='twitter:title' content={title} />
    <meta property='og:title' content={title} />

    {description && <meta name='description' content={description} />}
    {description && <meta name='twitter:description' content={description} />}
    {description && <meta name='og:description' content={description} />}

    {image && <meta name='twitter:image' content={description} />}
    {image && <meta name='og:image' content={description} />}
  </Head>
)

Meta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string
}

export default Meta
