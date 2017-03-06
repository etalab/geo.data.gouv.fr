import React, { Component } from 'react'

import { getDatasetOnDataGouv } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

import { container } from './Producer.css'

class Producer extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    const { datasetId } = this.props

    if (!datasetId) return
    return waitForDataAndSetState(getDatasetOnDataGouv(datasetId), this, 'dataset')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { datasetId } = this.props
    const { dataset } = this.state

    if (!datasetId || !dataset || !dataset.organization) return null

    return (
      <div className={container}>
        <img src={dataset.organization.logo || '/assets/avatar.png'} alt="producer logo" />
        <h4>{dataset.organization.name}</h4>
      </div>
    )
  }
}



export default Producer
