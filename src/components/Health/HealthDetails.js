import React, { Component } from 'react'
import { fetchCatalog } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

class HealthDetails extends Component {
  constructor(props) {
    super(props)
    this.state = { catalog: null, errors: []}
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchCatalog(this.props.params.catalogId), this, 'catalog')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { catalog } = this.state

    if (catalog) return <div>{catalog.name}</div>
    return null
  }
}

export default HealthDetails
