import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

import LinksSection from '../../components/LinksSection/LinksSection'
import DatasetSection from '../../components/DatasetSection/DatasetSection'
import DatasetChecklist from '../../components/DatasetChecklist/DatasetChecklist'
import DownloadDatasets from '../../components/Downloads/DownloadDatasets'
import FiltersSection from '../../components/FiltersSection/FiltersSection'
import Contacts from '../../components/Contact/Contacts'
import Thumbnails from '../../components/Thumbnails/Thumbnails'
import Producer from '../../components/Producer/Producer'
import Discussions from '../../components/Discussions/Discussions'
import TechnicalInformations from '../../components/TechnicalInformations/TechnicalInformations'
import Section from '../../components/Section/Section'
import SpatialExtentMap from '../../components/SpatialExtentMap/SpatialExtentMap'

import ContentLoader from '../../../../components/Loader/ContentLoader'
import Errors from '../../../../components/Errors/Errors'

import { fetchDataset, fetchCatalogs, getDataGouvPublication } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

import { container, loader, main, side } from './DatasetDetail.css'

export default class DatasetDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return Promise.all([
      this.updateDataset(),
      this.updateCatalogs(),
      this.updateDataGouvPublication(),
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateDataset() {
    return waitForDataAndSetState(fetchDataset(this.props.params.datasetId), this, 'dataset')
  }

  updateCatalogs() {
    return waitForDataAndSetState(fetchCatalogs(), this, 'catalogs')
  }

  updateDataGouvPublication() {
    return waitForDataAndSetState(getDataGouvPublication(this.props.params.datasetId), this, 'dataGouvPublication')
  }

  render() {
    const { dataset, catalogs, dataGouvPublication, errors } = this.state
    const remoteId = dataGouvPublication ? dataGouvPublication.remoteId : null

    if (errors.length) return <Errors errors={errors} />

    if (!dataset || !catalogs) return <div className={loader}><ContentLoader /></div>

    return (
      <DocumentTitle title={dataset.metadata.title}>
        <div className={container}>
          <div className={main}>
            <DatasetSection dataset={dataset} />

            <Section title={'Informations technique'}>
              <TechnicalInformations dataset={dataset} />
            </Section>

            <Section title={'Téléchargements'}>
              <DownloadDatasets distributions={dataset.dataset.distributions} />
            </Section>

            <Section title={'Liens'}>
              <LinksSection links={dataset.metadata.links} />
            </Section>

            <Section title={'Discussions'}>
              <Discussions datasetId={remoteId}/>
            </Section>

            <Section title={'Filtres'}>
              <FiltersSection keywords={dataset.metadata.keywords} organizations={dataset.organizations} catalogs={catalogs.filter(catalog => dataset.catalogs.includes(catalog._id))} />
            </Section>
          </div>

          <div className={side}>

            <Section title={'Producteur'}>
              <Producer
                datasetId={dataGouvPublication ? dataGouvPublication.remoteId : null}
                />
            </Section>

            {dataset.metadata.thumbnails && dataset.metadata.thumbnails.length ?
              <Section title={'Aperçu des données'}>
                <Thumbnails recordId={dataset.recordId} thumbnails={dataset.metadata.thumbnails} />
              </Section> :
              null
            }

            <Section title={'Publication sur data.gouv.fr'}>
              <DatasetChecklist dataset={dataset} />
            </Section>

            <Section title={'Contacts'}>
              <Contacts contacts={dataset.metadata.contacts}/>
            </Section>

            {dataset.metadata.spatialExtent ?
              <Section title={'Étendue spatiale'}>
                <SpatialExtentMap extent={dataset.metadata.spatialExtent} />
              </Section> : null
            }
          </div>

        </div>
      </DocumentTitle>
    )
  }
}
