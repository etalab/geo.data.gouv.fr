import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import prune from 'underscore.string/prune'
import { flowRight } from 'lodash'
import { translate } from 'react-i18next'
import { withRouter } from 'next/router'

import Piwik from './piwik'

import { PUBLIC_URL } from '@env'

const SITE_NAME = 'geo.data.gouv.fr'
const TWITTER_HANDLE = '@geodatagouv'

const Meta = ({ title, description, images, router, t }) => {
  if (!description) {
    description = t('meta.description')
  } else {
    description = prune(description, 160, '…')
  }

  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

  return (
    <Fragment>
      <Piwik title={fullTitle} />

      {title ? (
        <Head>
          <title>{fullTitle}</title>
          <meta name='twitter:title' content={title} />
          <meta property='og:title' content={title} />
        </Head>
      ) : (
        <Head>
          <title>{fullTitle}</title>
        </Head>
      )}

      {images && images.length > 0 ? (
        <Fragment>
          <Head>
            <meta name='twitter:image' content={images[0]} />
          </Head>

          {images.map((image, idx) => (
            <Head key={idx}>
              <meta property='og:image' content={image} />
            </Head>
          ))}
        </Fragment>
      ) : (
        <Head>
          <meta name='twitter:image' content={`${PUBLIC_URL}/static/images/geo-data-gouv-logo.jpg`} />
          <meta property='og:image' content={`${PUBLIC_URL}/static/images/geo-data-gouv-logo.jpg`} />
        </Head>
      )}

      <Head>
        <meta name='description' content={description} />
        <meta name='twitter:description' content={description} />
        <meta property='og:description' content={description} />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content={TWITTER_HANDLE} />

        <meta property='og:type' content='website' />
        <meta property='og:url' content={PUBLIC_URL + router.asPath} />
        <meta property='og:site_name' content={SITE_NAME} />
      </Head>
    </Fragment>
  )
}

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),

  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default flowRight(
  translate(),
  withRouter
)(Meta)
