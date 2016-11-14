import React, { Component } from 'react'
import CheckItem from '../CheckItem/CheckItem'

const styles = {
  checklist: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '3em',
  },
}

const ACCEPTED_LICENSES = [
  'fr-lo',
  'odbl',
]

class DatasetChecklist extends Component {
  _checkArray(array) {
    if (array && array.length) return true
    return false
  }

  checkLicense() {
    let valid = false

    if (ACCEPTED_LICENSES.includes(this.props.license)) {
      valid = true
    }
    return <CheckItem name={'Licence'} valid={valid} />
  }

  checkDataAvailability() {
    let valid = this._checkArray(this.props.distributions)
    return <CheckItem name={'Disponibilité de la donnée'} valid={valid} />
  }

  checkProducers() {
    let valid = this._checkArray(this.props.organizations)
    return <CheckItem name={'Producteur'} valid={valid} />
  }

  render() {
    const checklist = [
      () => this.checkLicense(),
      () => this.checkDataAvailability(),
      () => this.checkProducers(),
     ]

    return (
      <div style={styles.checklist}>
        {checklist.map((check, idx) => <div key={idx}>{check()}</div>)}
      </div>
    )
  }
}

export default DatasetChecklist
