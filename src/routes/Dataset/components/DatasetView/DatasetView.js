import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'

import Warning from 'common/components/Warning'
import Loader from 'common/components/Loader'

import Discussions from '../../../../modules/Datasets/components/Discussions/Discussions'

import DatasetBlock from '../DatasetBlock'
import DatasetHeader from '../DatasetHeader'
import DatasetTechnicalInfo from '../DatasetTechnicalInfo'
import DatasetDownloadList from '../DatasetDownloadList'
import DatasetLinks from '../DatasetLinks'
import DatasetFilters from '../DatasetFilters'
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
        credit: PropTypes.string,
        links: PropTypes.array.isRequired
      }).isRequired,

      dataset: PropTypes.shape({
        distributions: PropTypes.array.isRequired
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

    getDataGouvDataset: PropTypes.func.isRequired,
    fetchGeoJson: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { publication, getDataGouvDataset } = this.props

    if (publication && publication.remoteId) {
      getDataGouvDataset(publication.remoteId)
    }
  }

  render() {
    const { dataset, publication, dataGouvDataset, fetchGeoJson } = this.props
    const status = statusTranslate[dataset.metadata.status]

    return (
      <DocumentTitle title={dataset.metadata.title}>
        <div>
          {isWarningStatus(dataset.metadata.status) && (
            <Warning title={`Attention ce jeu de données est considéré comme ${status.status} par son producteur`}>
              {status.consequences}
            </Warning>
          )}
          <div className={styles.container}>
            <div className={styles.inner}>
              <div className={styles.main}>
                <DatasetHeader dataset={dataset} />

                <DatasetBlock title='Informations techniques'>
                  <DatasetTechnicalInfo dataset={dataset} status={status} />
                </DatasetBlock>

                <DatasetBlock title='Téléchargements'>
                  {dataset.dataset.distributions.length > 0 ? (
                    <DatasetDownloadList distributions={dataset.dataset.distributions} fetchGeoJson={fetchGeoJson} />
                  ) : (
                    <div>Aucune donnée n'est téléchargeable.</div>
                  )}
                </DatasetBlock>

                <DatasetBlock title='Liens'>
                  {dataset.metadata.links.length > 0 ? (
                    <DatasetLinks links={dataset.metadata.links} />
                  ) : (
                    <div>Aucun lien disponible.</div>
                  )}
                </DatasetBlock>

                {publication && publication.remoteId && (
                  <DatasetBlock title='Discussions'>
                    <Discussions remoteId={publication.remoteId} />
                  </DatasetBlock>
                )}

                <DatasetBlock title='Filtres'>
                  <DatasetFilters
                    keywords={dataset.metadata.keywords}
                    organizations={dataset.organizations}
                  />
                </DatasetBlock>
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

                {dataset.metadata.contacts.length > 0 && (
                  <DatasetBlock title='Contacts'>
                    <DatasetContactList contacts={dataset.metadata.contacts} />
                  </DatasetBlock>
                )}

                {dataset.metadata.credit && (
                  <DatasetBlock title='Contributions'>
                    <div>
                      {dataset.metadata.credit}
                    </div>
                  </DatasetBlock>
                )}
              </div>
            </div>

            <div className={styles.footer}>
              <div>Identifiant du jeu de données : <b>{dataset.metadata.id}</b></div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default DatasetView
