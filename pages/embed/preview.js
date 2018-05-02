import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import {translate} from 'react-i18next'
import bytes from 'bytes'

import {_get} from '../../lib/fetch'

import {generateDistributionInfo} from '../../lib/distribution'

import attachI18n from '../../components/hoc/attach-i18n'

import Loader from '../../components/preview/loader'
import ErrorMessage from '../../components/preview/error'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

const CenteredMap = dynamic(import('../../components/centered-map'), {
  loading: translate('preview')(({t}) => (
    <Loader>
      {t('loading.component')}
    </Loader>
  ))
})

class PreviewPage extends React.Component {
  static propTypes = {
    extent: PropTypes.object,
    distribution: PropTypes.object,
    error: PropTypes.string,

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    extent: null,
    distribution: null,
    error: null
  }

  static async getInitialProps({query}) {
    try {
      const {dataset, metadata} = await _get(`${GEODATA_API_URL}/records/${query.did}`)
      const distribution = dataset.distributions.find(d => d._id === query.rid)

      if (!distribution) {
        return {
          error: 'distributionNotFound'
        }
      }

      return {
        extent: metadata.spatialExtent,
        distribution
      }
    } catch (err) {
      return {
        error: 'datasetNotFound'
      }
    }
  }

  state = {
    data: null,
    error: null,
    loading: {
      state: 'initializing'
    }
  }

  componentDidMount() {
    const {error, distribution} = this.props

    if (error) {
      return this.setState({
        error: {
          state: error
        }
      })
    }

    const {link} = generateDistributionInfo(distribution)

    const req = new XMLHttpRequest()
    req.addEventListener('progress', event => {
      if (event.lengthComputable) {
        this.setState({
          loading: {
            state: 'downloading',
            download: {
              bytes: event.loaded,
              total: event.total
            }
          }
        })
      } else {
        this.setState({
          loading: {
            state: 'downloading',
            download: {
              bytes: event.loaded
            }
          }
        })
      }
    })

    req.addEventListener('load', () => {
      try {
        this.setState({
          loading: null,
          data: JSON.parse(req.responseText)
        })
      } catch (err) {
        this.setState({
          error: {
            state: 'downloading',
            err
          }
        })
      }
    })

    req.addEventListener('error', () => {
      this.setState({
        error: {
          state: 'downloading'
        }
      })
    })

    req.open('GET', `${link}?format=GeoJSON&projection=WGS84`)

    this.setState({
      loading: {
        state: 'downloading'
      }
    })

    req.send()
  }

  componentDidCatch(err) {
    this.setState({
      error: {
        state: 'unknown',
        err
      }
    })
  }

  renderLoader() {
    const {t} = this.props
    const {loading} = this.state

    switch (loading.state) {
      case 'initializing':
        return (
          <Loader>
            {t('loading.initializing')}
          </Loader>
        )

      case 'downloading':
        if (!loading.download) {
          return (
            <Loader>
              {t('loading.downloading.init')}
            </Loader>
          )
        }

        if (loading.download.total) {
          return (
            <Loader>
              {t('loading.downloading.progressWithTotal', {
                bytes: bytes(loading.download.bytes),
                total: bytes(loading.download.total)
              })}
            </Loader>
          )
        }

        return (
          <Loader>
            {t('loading.downloading.progress', {
              bytes: bytes(loading.download.bytes)
            })}
          </Loader>
        )

      default:
        return null
    }
  }

  renderError() {
    const {t} = this.props
    const {error} = this.state

    switch (error.state) {
      case 'datasetNotFound':
        return (
          <ErrorMessage>
            {t('error.datasetNotFound')}
          </ErrorMessage>
        )

      case 'distributionNotFound':
        return (
          <ErrorMessage>
            {t('error.distributionNotFound')}
          </ErrorMessage>
        )

      case 'downloading':
        return (
          <ErrorMessage>
            {t('error.downloading')}
          </ErrorMessage>
        )

      default:
        return (
          <ErrorMessage>
            {t('error.unknown')}
          </ErrorMessage>
        )
    }
  }

  render() {
    const {extent} = this.props
    const {data, error, loading} = this.state

    return (
      <div>
        {error ? this.renderError() : loading ? this.renderLoader() : (
          <CenteredMap data={data} extent={extent} />
        )}

        <style jsx global>{`
          * {
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-size: 14px;
            margin: 0;
          }
        `}</style>

        <style jsx>{`
          div {
            position: absolute;
            height: 100%;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default attachI18n('preview')(PreviewPage)
