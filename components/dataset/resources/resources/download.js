import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'
import {uniqBy, sortBy} from 'lodash'

import SimpleDownload from '../downloads/simple'
import VectorDownload from '../downloads/vector'

const {publicRuntimeConfig: {
  PUBLIC_URL,
  TRANSCODER_URL
}} = getConfig()

const DOWNLOAD_RESOURCE_TYPE_ORDER = {
  vector: 1,
  raster: 2,
  table: 3,
  data: 4
}

class DownloadResource extends React.Component {
  static propTypes = {
    recordId: PropTypes.string.isRequired,
    resource: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      href: PropTypes.string.isRequired,
      downloads: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })).isRequired
    }).isRequired,

    setPreview: PropTypes.func.isRequired
  }

  renderDownload(download) {
    switch (download.resourceType) {
      case 'vector': {
        const {recordId, resource, setPreview} = this.props

        const url = `${TRANSCODER_URL}/links/${resource.proxyId}/downloads/${download.id}`
        const embed = `${PUBLIC_URL}/embed/datasets/${recordId}/resources/download:${resource.proxyId}/${download.id}`

        return (
          <VectorDownload
            available
            name={download.name}
            url={url}
            setPreview={() => setPreview(url, download.name, embed)}
          />
        )
      }

      default:
        return (
          <SimpleDownload
            type={download.type}
            name={download.name}
            url={download.url}
          />
        )
    }
  }

  render() {
    const {resource} = this.props

    const downloads = sortBy(
      uniqBy(resource.downloads, download => {
        return download.type + download.name
      }),
      download => {
        return DOWNLOAD_RESOURCE_TYPE_ORDER[download.resourceType]
      }
    )

    return (
      <div className='container'>
        <div className='header'>
          <h5>{resource.name || resource.href}</h5>
          <p>{resource.description && resource.description}</p>
        </div>
        <div className='downloads'>
          {downloads.map(download => (
            <div key={download.id} className='download'>
              {this.renderDownload(download)}
            </div>
          ))}
        </div>

        <style jsx>{`
          @import 'colors';

          .header {
            margin-bottom: 0.3em;
          }

          h5 {
            font-weight: normal;
            margin-bottom: 0;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
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

          .downloads {
            border-left: 3px solid $lightgrey;
            padding-left: 8px;
          }

          .download {
            margin: 5px 0;
          }
        `}</style>
      </div>
    )
  }
}

export default DownloadResource
