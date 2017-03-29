import React, { Component } from 'react'

import DatasetDescription from '../DatasetDescription/DatasetDescription'

import Button from '../../../../components/Buttons/Button'

import { doneSince } from '../../../../helpers/doneSince'
import { statusTranslate } from '../../../../helpers/status'
import { getLicense } from '../../../../helpers/dataGouvChecks'

import { section, container, head, inspireThemeHead, resume, theme, infos, stat } from './DatasetSection.css'

class DatasetSection extends Component {
  constructor(props) {
    super(props)
    this.state = {shortDescription: true}
  }

  wrapDescription() {
    this.setState({shortDescription: !this.state.shortDescription})
  }

  render() {
    const { dataset, warning, hideStatusWarning } = this.props
    const { shortDescription } = this.state
    const { title, description, status, type, purpose, lineage, inspireTheme } = dataset.metadata
    const revisionDate = doneSince(dataset.revisionDate)
    const completStatus = statusTranslate[status]
    const license = getLicense(dataset.metadata.license)

    return (
      <div className={container}>
        <div className={inspireTheme ? inspireThemeHead : head}>
          <div className={resume}>
            <h1>{title}</h1>
            <div className={infos}>
              <div>Type : <span>{type || 'inconnu'}</span></div>
              <div>Licence : <span>{license.name ? <a href={license.link}>{license.name}</a> : license}</span></div>
              <div>Dernière mise à jour : <span>{revisionDate}</span></div>
            </div>
          </div>

          { inspireTheme ?
            <div className={theme}>
              <div><img src={`/assets/inspire-icons/${inspireTheme.id}.svg`} alt='inspire-theme-icon'/></div>
              <div><a href={inspireTheme.uri}>{inspireTheme.label.fr}</a></div>
            </div> : null
          }
        </div>

        <div className={section}>
          {warning ?
            <div className={stat}>
              <h2>Attention !</h2>
              <h3>Cette fiche de données est {completStatus.status}.</h3>
              <div>{completStatus.consequences}</div>
              <Button text="Afficher tout de même" action={() => hideStatusWarning()} />
            </div> :
            <div>
              <DatasetDescription
                description={description}
                shortDescription={shortDescription}
                showMore={() => this.wrapDescription()} />
              <p>
                <b>Objectif : </b>{purpose ? purpose : 'Non renseigné'}
              </p>
              <p>
                <b>Origine de la donnée : </b>{lineage ? lineage : 'Non renseignée'}
              </p>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default DatasetSection
