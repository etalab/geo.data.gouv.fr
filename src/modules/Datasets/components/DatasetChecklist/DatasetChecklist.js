import React, { Component } from 'react'

import CheckLicense from '../Checks/CheckLicense'
import CheckProducers from '../Checks/CheckProducers'
import CheckDataAvailability from '../Checks/CheckDataAvailability'
import Button from '../../../../components/Buttons/Button'

import { checklist, highlight } from './DatasetChecklist.css'
import { checkLicense, checkProducers, checkDataAvailability } from '../../../../helpers/dataGouvChecks'

class DatasetChecklist extends Component {
  constructor(props) {
    super(props)
    this.state = {showDetails: false}
  }

  handleDetails() {
    this.setState({showDetails: !this.state.showDetails})
  }

  render() {
    const { showDetails } = this.state
    const { metadata, organizations, dataset } = this.props.dataset
    const licenseCheck = checkLicense(metadata.license)
    const producersCheck = checkProducers(organizations)
    const dataAvailabilityCheck = checkDataAvailability(dataset.distributions)

    if (licenseCheck && producersCheck && dataAvailabilityCheck) {
      if (metadata.datagouvLink) {
        return (
          <div>
            <a href={metadata.datagouvLink}>Consulter</a> le jeu de données sur <a href="https://www.data.gouv.fr/">data.gouv.fr</a>
          </div>
        )
      } else {
        return (
          <div>
            Ce jeu de données peut être publié sur data.gouv.fr
            <div className={highlight}>Une action du producteur est nécessaire.</div>
          </div>
        )
      }
    } else {
      return (
        <div className={checklist}>
          Ce jeu de données ne peut pas être publié sur data.gouv.fr
          {showDetails ?
            (
              <div>
                <CheckLicense license={metadata.license} valid={licenseCheck} />
                <CheckProducers organizations={organizations} valid={producersCheck} />
                <CheckDataAvailability distributions={dataset.distributions} valid={dataAvailabilityCheck} />
              </div>
            ) : null
          }
          <Button text={`${showDetails ? 'Masquer' : 'Afficher'} le détail`} action={() => this.handleDetails()}/>
        </div>
      )
    }
  }
}

export default DatasetChecklist
