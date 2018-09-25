import React from 'react'
import PropTypes from 'prop-types'
import getConfig from 'next/config'

import SimpleDownload from '../downloads/simple'
import VectorDownload from '../downloads/vector'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

class DownloadResource extends React.Component {
  static propTypes = {
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
        const {resource, setPreview} = this.props

        const url = `${GEODATA_API_URL}/downloads/${resource.proxyId}/${download.id}`

        return (
          <VectorDownload
            key={download.id}
            available
            name={download.name}
            url={url}
            setPreview={() => setPreview(url, download.name)}
          />
        )
      }

      default:
        return (
          <SimpleDownload
            key={download.id}
            type={download.type}
            name={download.name}
            url={download.url}
          />
        )
    }
  }

  render() {
    const {resource} = this.props

    return (
      <div className='container'>
        <div className='header'>
          <h5>{resource.name || resource.href}</h5>
          <p>{resource.description && resource.description}</p>
        </div>
        <div className='downloads'>
          {resource.downloads.map(
            download => this.renderDownload(download)
          )}
        </div>

        <style jsx>{`
          @import 'colors';

          .header {
            margin-bottom: 0.3em;
          }

          h5 {
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
        `}</style>
      </div>
    )
  }
}

export default DownloadResource
