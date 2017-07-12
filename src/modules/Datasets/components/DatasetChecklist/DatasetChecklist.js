import React, { Component } from 'react'

import CheckLicense from '../Checks/CheckLicense'
import CheckProducers from '../Checks/CheckProducers'
import CheckDataAvailability from '../Checks/CheckDataAvailability'
import Button from '../../../../components/Buttons/Button'

import { getDataGouvPublication } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

import { checklist, highlight } from './DatasetChecklist.scss'
import { checkLicense, checkProducers, checkDataAvailability } from '../../../../helpers/dataGouvChecks'

class DatasetChecklist extends Component {
  constructor(props) {
    super(props)
    this.state = {showDetails: false}
  }

  componentWillMount() {
    return waitForDataAndSetState(getDataGouvPublication(this.props.dataset.recordId), this, 'dataGouvPublication')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  handleDetails() {
    this.setState({showDetails: !this.state.showDetails})
  }

  render() {
    const { showDetails, dataGouvPublication } = this.state
    const { metadata, organizations, dataset } = this.props.dataset
    const licenseCheck = checkLicense(metadata.license)
    const producersCheck = checkProducers(organizations)
    const dataAvailabilityCheck = checkDataAvailability(dataset.distributions)

    if (licenseCheck && producersCheck && dataAvailabilityCheck) {
      if (dataGouvPublication) {
        return (
          <div>
            <a href={dataGouvPublication.remoteUrl}>Consulter le jeu de données sur data.gouv.fr</a>
          </div>
        )
      } else {
        return (
          <div>
            <div>Ce jeu de données <b>peut</b> être publié sur data.gouv.fr</div>
            <div className={highlight}>Une action du producteur est nécessaire.</div>
          </div>
        )
      }
    } else {
      return (
        <div className={checklist}>
          <div>Ce jeu de données <b>ne peut pas</b> être publié sur data.gouv.fr</div>
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
