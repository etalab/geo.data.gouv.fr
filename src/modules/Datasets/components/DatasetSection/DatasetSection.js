import React, { Component } from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'
import MarkdownViewer from '../Markdown/MarkdownViewer'

import { doneSince } from '../../../../helpers/doneSince'

import { section, container, copy, resume, infos } from './DatasetSection.css'

class DatasetSection extends Component {
  constructor(props) {
    super(props)
    this.state = { copied: false }
  }

  render() {
    const { dataset } = this.props
    const type = dataset.metadata.type || 'inconnu'
    const license = dataset.metadata.license || 'non déterminé'
    const revisionDate = doneSince(dataset.revisionDate)

    return (
      <div className={container}>
        <div className={resume}>
          <h1>{dataset.metadata.title}</h1>
          <div className={infos}>
            <div>Type : <span>{type}</span></div>
            <div>Licence : <span>{license}</span></div>
            <div>Dernière mise à jour : <span>{revisionDate}</span></div>
          </div>
          <div>Identifiant du jeu de données :
            <CopyToClipboard text={dataset.metadata.id} onCopy={() => this.setState({copied: true})}>
              <span className={copy}>{dataset.metadata.id}{this.state.copied ? <div>copié !</div> : null}</span>
            </CopyToClipboard>
          </div>
        </div>


        <div className={section}>
          {!dataset.metadata.description || !dataset.metadata.description.length ?
            <div>Aucune description.</div> :
            <MarkdownViewer markdown={dataset.metadata.description} />
          }
          <p>
            <b>Origine de la donnée : </b>{dataset.metadata.lineage ? dataset.metadata.lineage : 'Non renseignée'}
          </p>
        </div>
      </div>
    )
  }
}

export default DatasetSection
