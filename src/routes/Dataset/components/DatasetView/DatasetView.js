import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import Warning from 'common/components/Warning'
import Loader from 'common/components/Loader'

import DatasetBlock from '../DatasetBlock'
import DatasetHeader from '../DatasetHeader'
import DatasetProducer from '../DatasetProducer'
import DatasetThumbnails from '../DatasetThumbnails'
import DatasetSpatialExtent from '../DatasetSpatialExtent'
import DatasetDataGouvPublication from '../DatasetDataGouvPublication'
import DatasetContactList from '../DatasetContactList'

import { isWarningStatus, statusTranslate } from './status'

import styles from './DatasetView.scss'

class DatasetView extends React.PureComponent {
  static propTypes = {
    dataset: PropTypes.shape({
      metadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        status: PropTypes.string,
        spatialExtent: PropTypes.object,
        contacts: PropTypes.array.isRequired,
        credit: PropTypes.string
      }).isRequired
    }).isRequired,

    publication: PropTypes.shape({
      remoteId: PropTypes.string.isRequired
    }),

    dataGouvDataset: PropTypes.shape({
      dataset: PropTypes.object,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired,
    }).isRequired,

    getDataGouvDataset: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { publication, getDataGouvDataset } = this.props

    if (publication && publication.remoteId) {
      getDataGouvDataset(publication.remoteId)
    }
  }

  render() {
    const { dataset, publication, dataGouvDataset } = this.props
    const translated = statusTranslate[dataset.metadata.status]

    return (
      <DocumentTitle title={dataset.metadata.title}>
        <div>
          {isWarningStatus(dataset.metadata.status) && (
            <Warning title={`Attention ce jeu de données est considéré comme ${translated.status} par son producteur`}>
              {translated.consequences}
            </Warning>
          )}
          <div className={styles.container}>
            <div className={styles.main}>
              <DatasetHeader dataset={dataset} />
            </div>

            <div className={styles.aside}>
              {publication && publication.remoteId && (
                <DatasetBlock title='Producteur'>
                  <Loader loading={dataGouvDataset.pending}>
                    {dataGouvDataset.dataset && (
                      <DatasetProducer organization={dataGouvDataset.dataset.organization} />
                    )}
                  </Loader>
                </DatasetBlock>
              )}

              {dataset.metadata.thumbnails && dataset.metadata.thumbnails.length > 0 && (
                <DatasetBlock title='Aperçu des données'>
                  <DatasetThumbnails recordId={dataset.recordId} thumbnails={dataset.metadata.thumbnails} />
                </DatasetBlock>
              )}

              {dataset.metadata.spatialExtent && (
                <DatasetBlock title='Étendue spatiale'>
                  <DatasetSpatialExtent extent={dataset.metadata.spatialExtent} />
                </DatasetBlock>
              )}

              <DatasetBlock title='Publication sur data.gouv.fr'>
                <DatasetDataGouvPublication dataset={dataset} publication={publication} />
              </DatasetBlock>

              <DatasetBlock title={'Contacts'}>
                <DatasetContactList contacts={dataset.metadata.contacts} />
              </DatasetBlock>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default DatasetView
