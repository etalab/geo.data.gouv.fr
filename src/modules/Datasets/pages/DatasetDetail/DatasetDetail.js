import React, { Component } from 'react'

import LinksSection from '../../components/LinksSection/LinksSection'
import DownloadDatasets from '../../components/Downloads/DownloadDatasets'
import FiltersSection from '../../components/FiltersSection/FiltersSection'
import Discussions from '../../components/Discussions/Discussions'
import TechnicalInformations from '../../components/TechnicalInformations/TechnicalInformations'
import Section from '../../../../components/Section/Section'


import { container, main } from './DatasetDetail.scss'

export default class DatasetDetail extends Component {

  render() {
    const { dataset, catalogs, dataGouvPublication } = this.props
    const remoteId = dataGouvPublication ? dataGouvPublication.remoteId : null

    return (
      <div>
      <div className={container}>

        <div className={main}>
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
            <Discussions remoteId={remoteId}/>
          </Section>

          <Section title={'Filtres'}>
            <FiltersSection keywords={dataset.metadata.keywords} organizations={dataset.organizations} catalogs={catalogs.filter(catalog => dataset.catalogs.includes(catalog._id))} />
          </Section>

          <div>Identifiant du jeu de données : <b>{dataset.metadata.id}</b></div>

        </div>
      </div>
    </div>
    )
  }
}
