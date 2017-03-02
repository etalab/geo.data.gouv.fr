import React, { Component } from 'react'

import LinksSection from '../../components/LinksSection/LinksSection'
import Download from '../Downloads/Download'
import OtherDownload from '../Downloads/OtherDownload'

import { content, vector } from './DownloadDatasets.css';

class DownloadDatasets extends Component {

  render() {
    const { distributions, links } = this.props
    const vectorDistributions = distributions.filter(distribution => !distribution.originalDistribution)
    const otherDistributions = distributions.filter(distribution => distribution.originalDistribution === true)

    return (
      <div className={content}>
        <div className={vector}>
          {vectorDistributions.length ? vectorDistributions.map((distribution, idx) =>
            <Download key={idx} distribution={distribution} />
          ) :
          <p>Aucune donnée vectorielle n'est disponible.</p>
        }
          {otherDistributions.length ?
            <OtherDownload distributions={otherDistributions} />
            : null
            }
        </div>
        <h3>Liens</h3>
        <LinksSection links={links} />
      </div>
    )
  }
}

export default DownloadDatasets
