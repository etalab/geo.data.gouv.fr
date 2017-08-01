import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'common/components/Buttons'

import { checkLicense, checkProducers, checkDataAvailability } from 'common/helpers/dataGouvChecks'

import { CheckLicense, CheckProducers, CheckDataAvailability } from '../DatasetChecks'

import styles from './DatasetDataGouvPublication.scss'

class DatasetDataGouvPublication extends React.PureComponent {
  static propTypes = {
    dataset: PropTypes.shape({
      metadata: PropTypes.shape({
        license: PropTypes.string
      }).isRequired,

      organizations: PropTypes.array.isRequired,

      dataset: PropTypes.shape({
        distributions: PropTypes.array.isRequired
      }).isRequired
    }).isRequired,

    publication: PropTypes.shape({
      remoteUrl: PropTypes.string.isRequired
    })
  }

  state = {
    expanded: false
  }

  toggleDetails = () => {
    this.setState(state => ({
      expanded: !state.expanded
    }))
  }

  render () {
    const { dataset, publication } = this.props
    const { expanded } = this.state

    const licenseCheck = checkLicense(dataset.metadata.license)
    const producersCheck = checkProducers(dataset.organizations)
    const dataAvailabilityCheck = checkDataAvailability(dataset.dataset.distributions)

    if (licenseCheck && producersCheck && dataAvailabilityCheck) {
      if (publication) {
        return (
          <div>
            <a href={publication.remoteUrl}>Consulter le jeu de données sur data.gouv.fr</a>
          </div>
        )
      } else {
        return (
          <div>
            <div>Ce jeu de données <b>peut</b> être publié sur data.gouv.fr</div>
            <div className={styles.highlight}>Une action du producteur est nécessaire.</div>
          </div>
        )
      }
    } else {
      return (
        <div className={styles.checklist}>
          <div>Ce jeu de données <b>ne peut pas</b> être publié sur data.gouv.fr</div>
          {expanded && (
            <div>
              <CheckLicense license={dataset.metadata.license} valid={licenseCheck} />
              <CheckProducers organizations={dataset.organizations} valid={producersCheck} />
              <CheckDataAvailability distributions={dataset.dataset.distributions} valid={dataAvailabilityCheck} />
            </div>
          )}
          <Button text={`${expanded ? 'Masquer' : 'Afficher'} le détail`} action={this.toggleDetails} />
        </div>
      )
    }
  }
}

export default DatasetDataGouvPublication
