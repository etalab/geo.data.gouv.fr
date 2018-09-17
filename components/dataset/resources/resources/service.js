import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import {translate} from 'react-i18next'

import VectorDownload from '../downloads/vector'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

class ServiceResource extends React.Component {
  static propTypes = {
    resource: PropTypes.shape({
      serviceType: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired
      })).isRequired
    }).isRequired,

    setPreview: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  setPreview = feature => {
    const {resource, setPreview} = this.props

    setPreview(
      `/wfs/${resource.serviceId}/${feature.name}`,
      feature.name
    )
  }

  renderFeature(feature) {
    const {resource, setPreview} = this.props

    const url = `${GEODATA_API_URL}/wfs/${resource.serviceId}/${feature.name}`

    return (
      <VectorDownload
        key={feature.name}
        name={feature.name}
        url={url}
        available={feature.available}
        setPreview={() => setPreview(url, feature.name)}
      />
    )
  }

  render() {
    const {resource, t} = this.props

    return (
      <div className='container'>
        <div className='header'>
          <h5>{t(`downloads.services.${resource.serviceType}`)}</h5>
          <p>{resource.href}</p>
        </div>
        <div className='features'>
          {resource.features.map(
            feature => this.renderFeature(feature)
          )}
        </div>

        <style jsx>{`
          @import 'colors';

          .container {
            margin-bottom: 1em;
          }

          .header {
            margin-bottom: 0.2em;
          }

          h5 {
            margin-bottom: 0;
          }

          p {
            margin-bottom: 0;
            font-size: 0.9em;
            font-style: italic;
            color: $grey;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
          }

          .features {
            border-left: 3px solid $lightgrey;
            padding-left: 8px;
          }
        `}</style>
      </div>
    )
  }
}

export default translate('dataset')(ServiceResource)
