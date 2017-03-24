import React, { Component } from 'react'

import DatasetDescription from '../DatasetDescription/DatasetDescription'

import { doneSince } from '../../../../helpers/doneSince'

import { section, container, resume, infos } from './DatasetSection.css'

class DatasetSection extends Component {
  constructor(props) {
    super(props)
    this.state = {shortDescription: true}
  }

  wrapDescription() {
    this.setState({shortDescription: !this.state.shortDescription})
  }

  render() {
    const { dataset } = this.props
    const { shortDescription } = this.state
    const { title, description, purpose, lineage } = dataset.metadata
    const type = dataset.metadata.type || 'inconnu'
    const license = dataset.metadata.license || 'non déterminé'
    const revisionDate = doneSince(dataset.revisionDate)

    return (
      <div className={container}>
        <div className={resume}>
          <h1>{title}</h1>
          <div className={infos}>
            <div>Type : <span>{type}</span></div>
            <div>Licence : <span>{license}</span></div>
            <div>Dernière mise à jour : <span>{revisionDate}</span></div>
          </div>
        </div>

        <div className={section}>
          <DatasetDescription
            description={description}
            shortDescription={shortDescription}
            showMore={() => this.wrapDescription()} />
          <p>
            <b>Objectif : </b>{purpose ? purpose : 'Non renseignée'}
          </p>
          <p>
            <b>Origine de la donnée : </b>{lineage ? lineage : 'Non renseignée'}
          </p>
        </div>
      </div>
    )
  }
}

export default DatasetSection
