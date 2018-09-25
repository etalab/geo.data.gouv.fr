import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import {translate} from 'react-i18next'

import VectorDownload from '../downloads/vector'

const {publicRuntimeConfig: {
  PUBLIC_URL,
  GEODATA_API_URL
}} = getConfig()

class ServiceResource extends React.Component {
  static propTypes = {
    recordId: PropTypes.string.isRequired,
    resource: PropTypes.shape({
      serviceType: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.shape({
        typeName: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired,
        name: PropTypes.string
      })).isRequired
    }).isRequired,

    setPreview: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  renderFeature(feature) {
    const {recordId, resource, setPreview} = this.props

    const url = `${GEODATA_API_URL}/services/${resource.serviceId}/feature-types/${feature.name}/download`
    const embed = `${PUBLIC_URL}/embed/datasets/${recordId}/services/${resource.serviceId}/${feature.name}/preview`

    return (
      <VectorDownload
        key={feature.typeName}
        name={feature.typeName}
        url={url}
        available={feature.available}
        setPreview={() => setPreview(url, feature.typeName, embed)}
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
