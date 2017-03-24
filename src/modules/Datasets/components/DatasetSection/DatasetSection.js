import React, { Component } from 'react'

import DatasetDescription from '../DatasetDescription/DatasetDescription'

import { doneSince } from '../../../../helpers/doneSince'

import { section, container, head, resume, theme, infos } from './DatasetSection.css'

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
    const { title, description, type, purpose, lineage, license, inspireTheme } = dataset.metadata
    const revisionDate = doneSince(dataset.revisionDate)

    return (
      <div className={container}>
        <div className={head}>
          <div className={resume}>
            <h1>{title}</h1>
            <div className={infos}>
              <div>Type : <span>{type || 'inconnu'}</span></div>
              <div>Licence : <span>{license || 'non déterminé'}</span></div>
              <div>Dernière mise à jour : <span>{revisionDate}</span></div>
            </div>
          </div>

          <div className={theme}>
            <div><img src={`/assets/inspire-icons/${inspireTheme.id}.svg`} alt='inspire-theme-icon'/></div>
            <div><a href={inspireTheme.uri}>{inspireTheme.label.fr}</a></div>
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
