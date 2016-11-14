import React, { Component } from 'react'
import { fetchCatalog, fetchHarvest } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import HarvestContent from './HarvestContent'
import HarvestHeader from './HarvestHeader'

const styles = {
  paper: {
    padding: '3em',
  }
}

class HarvestDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return Promise.all([
      this.updateCatalog(),
      this.updateHarvest(),
    ])
  }

  updateHarvest() {
    return waitForDataAndSetState(
      fetchHarvest(this.props.params.catalogId, this.props.params.harvestId),
      this,
      'harvest'
    )
  }

  updateCatalog() {
    return waitForDataAndSetState(
      fetchCatalog(this.props.params.catalogId),
      this,
      'catalog'
    )
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    if (this.state.harvest && this.state.catalog) {
      const successful = this.state.harvest.status === 'successful'

      return (
        <div style={styles.paper} className="harvest-detail">

          <HarvestHeader
            catalogId={this.props.params.catalogId}
            catalogName={this.state.catalog.name}
            harvest={this.state.harvest}
            successful={successful} />

          <HarvestContent successful={successful} logs={this.state.harvest.log}/>

        </div>
    )} else {
      return <div></div>
    }
  }
}

export default HarvestDetail
