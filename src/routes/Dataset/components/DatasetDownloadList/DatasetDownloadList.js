import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import DatasetDownload from '../DatasetDownload'
import DatasetPreviewContainer from '../../containers/DatasetPreviewContainer'

class DatasetDownloadList extends React.PureComponent {
  static propTypes = {
    distributions: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
      name: PropTypes.string,
      location: PropTypes.string
    })).isRequired,

    fetchGeoJson: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  }

  state = {}

  setPreview = ({ distribution, link }) => {
    const { fetchGeoJson } = this.props

    this.setState({
      preview: {
        distribution,
        link
      }
    })

    fetchGeoJson(link)
  }

  resetPreview = () => {
    this.setState({
      preview: null
    })
  }

  render() {
    const { distributions, t } = this.props
    const { preview } = this.state

    const vectorDistributions = distributions.filter(distribution => !distribution.originalDistribution)
    const otherDistributions = distributions.filter(distribution => distribution.originalDistribution === true)

    return (
      <div>
        <div>
          {vectorDistributions.length > 0 && (
            <div>
              <h4>{t('components.DatasetDownloadList.vectorDataTitle')}</h4>
              {vectorDistributions.map(distribution => (
                <DatasetDownload
                  key={distribution._id}
                  distribution={distribution}
                  isPreview={preview && preview.distribution._id === distribution._id}
                  setPreview={this.setPreview}
                  resetPreview={this.resetPreview}
                />
              ))}
            </div>
          )}
          {otherDistributions.length > 0 && (
            <div>
              <h4>{t('components.DatasetDownloadList.otherDataTitle')}</h4>
              {otherDistributions.map(distribution => distribution.available ? (
                <a key={distribution._id} href={distribution.location}>
                  {distribution.name}
                </a>
              ) : (
                <div key={distribution._id}>
                  {distribution.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {preview && (
          <DatasetPreviewContainer
            preview={preview}
            closePreview={this.resetPreview}
          />
        )}
      </div>
    )
  }
}

export default translate('Dataset')(DatasetDownloadList)
