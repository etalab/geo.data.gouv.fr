import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import bytes from 'bytes'

import {_get} from '../../lib/fetch'

import attachI18n from '../../components/hoc/attach-i18n'

import CenteredMap from '../../components/centered-map'
import Loader from '../../components/centered-map/loader'
import ErrorMessage from '../../components/centered-map/error-message'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

class PreviewPage extends React.Component {
  static propTypes = {
    extent: PropTypes.object,
    link: PropTypes.string,
    error: PropTypes.string,

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    extent: null,
    link: null,
    error: null
  }

  static async getInitialProps({query}) {
    try {
      const {recordId, metadata} = await _get(`${GEODATA_API_URL}/records/${query.did}`)

      switch (query.rtype) {
        case 'service.wfs':
          return {
            recordId,
            extent: metadata.spatialExtent,
            link: `${GEODATA_API_URL}/services/${query.rid}/feature-types/${query.fid}/download`
          }

        case 'download':
          return {
            recordId,
            extent: metadata.spatialExtent,
            link: `${GEODATA_API_URL}/links/${query.rid}/downloads/${query.fid}/download`
          }

        default:
          return {
            error: 'distributionNotFound'
          }
      }
    } catch (error) {
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
    const {error, link} = this.props

    if (error) {
      return this.setState({
        error: {
          state: error
        }
      })
    }

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
        if (req.status === 200) {
          this.setState({
            loading: null,
            data: JSON.parse(req.responseText)
          })
        } else {
          this.setState({
            error: {
              state: 'downloading'
            }
          })
        }
      } catch (error) {
        this.setState({
          error: {
            state: 'downloading',
            error
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

  componentDidCatch(error) {
    this.setState({
      error: {
        state: 'unknown',
        error
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
