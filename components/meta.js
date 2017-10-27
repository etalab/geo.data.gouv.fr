import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

const SITE_NAME = 'geo.data.gouv.fr'

const Meta = ({ title }) => (
  <Head>
    <title>
      {title} | {SITE_NAME}
    </title>
    <meta name='twitter:title' content={title} />
    <meta property='og:title' content={title} />
  </Head>
)

Meta.propTypes = {
  title: PropTypes.node.isRequired
}

export default Meta
