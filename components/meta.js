import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import Head from 'next/head'
import prune from 'underscore.string/prune'
import {flowRight} from 'lodash'
import {translate} from 'react-i18next'
import {withRouter} from 'next/router'

const {publicRuntimeConfig: {
  PUBLIC_URL
}} = getConfig()

const SITE_NAME = 'geo.data.gouv.fr'
const TWITTER_HANDLE = '@geodatagouv'

const Meta = ({title, description, images, router, t}) => {
  if (description) {
    description = prune(description, 160, '…')
  } else {
    description = t('meta.description')
  }

  return (
    <Fragment>
      {title ? (
        <Head>
          <title>{title} | {SITE_NAME}</title>
          <meta name='twitter:title' content={title} />
          <meta property='og:title' content={title} />
        </Head>
      ) : (
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
      )}

      {images && images.length > 0 ? (
        <Fragment>
          <Head>
            <meta name='twitter:image' content={images[0]} />
          </Head>

          {images.map(image => (
            <Head key={image}>
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

Meta.defaultProps = {
  title: null,
  description: null,
  images: null
}

export default flowRight(
  translate(),
  withRouter
)(Meta)
