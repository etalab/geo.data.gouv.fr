import React, { Component } from 'react'

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
import SpatialExtentMap from '../../components/SpatialExtentMap/SpatialExtentMap'

import { statusTranslate } from '../../../../helpers/status'

import Section from '../../../../components/Section/Section'

import { container, warning, main, side } from './DatasetDetail.css'

export default class DatasetDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {errors: [], statusWarning: this.isWarningStatus()}
  }

  isWarningStatus() {
    const { dataset } = this.props

    if (dataset.metadata.status) {
      if (statusTranslate[dataset.metadata.status] && statusTranslate[dataset.metadata.status].consequences) {
        return true
      }
    }
    return false
  }

  hideStatusWarning() {
    this.setState({statusWarning: false})
  }

  render() {
    const { statusWarning } = this.state
    const { dataset, catalogs, dataGouvPublication } = this.props
    const remoteId = dataGouvPublication ? dataGouvPublication.remoteId : null

    if (statusWarning) {
      return (
        <div className={warning}>
          <DatasetSection dataset={dataset} warning={statusWarning} hideStatusWarning={() => this.hideStatusWarning()} />
        </div>
      )
    }

    return (
      <div className={container}>
        <div className={main}>
          <DatasetSection dataset={dataset} />

          <Section title={'Informations techniques'}>
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

          <div>Identifiant du jeu de données : <b>{dataset.metadata.id}</b></div>

        </div>


        <div className={side}>

          {remoteId ?
            <Section title={'Producteur'}>
              <Producer datasetId={remoteId} />
            </Section> : null
          }

          {dataset.metadata.thumbnails && dataset.metadata.thumbnails.length ?
            <Section title={'Aperçu des données'}>
              <Thumbnails recordId={dataset.recordId} thumbnails={dataset.metadata.thumbnails} />
            </Section> : null
          }

          {dataset.metadata.spatialExtent ?
            <Section title={'Étendue spatiale'}>
              <SpatialExtentMap extent={dataset.metadata.spatialExtent} />
            </Section> : null
          }

          <Section title={'Publication sur data.gouv.fr'}>
            <DatasetChecklist dataset={dataset} />
          </Section>

          <Section title={'Contacts'}>
            <Contacts contacts={dataset.metadata.contacts}/>
          </Section>

          {dataset.metadata.credit ?
            <Section title={'Contributions'}>
              {dataset.metadata.credit}
            </Section> : null
          }
        </div>

      </div>
    )
  }
}
