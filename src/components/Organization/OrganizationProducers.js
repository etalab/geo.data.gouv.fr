import React, { Component } from 'react'
import Errors from '../Errors/Errors'
import { getProducers } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

class OrganizationProducers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      producers: [],
      errors: []
    }
  }

  componentWillMount() {
    return waitForDataAndSetState(getProducers(), this, 'producers')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { producers, errors } = this.state

    if (errors.length) return <Errors errors={errors}/>
    if (!producers.length) return null

    return (
      <div>
      </div>
    )
  }
}

export default OrganizationProducers
