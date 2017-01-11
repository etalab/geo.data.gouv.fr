import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'

// Import Helpers
import { fetchCatalog, fetchHarvest } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

// Import Shared Components
import LastHarvestStatus from '../../../../components/LastHarvestStatus/LastHarvestStatus'

// Import Components
import HarvestLogs from '../../components/HarvestLogs/HarvestLogs'
import HarvestResults from '../../components/HarvestResults/HarvestResults'

// Import CSS
import { container, results } from './HarvestDetail.css'

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
    const { harvest, catalog } = this.state
    const { params } = this.props

    if (!harvest || !catalog) return null

    const successful = harvest.status === 'successful'

    return (
      <DocumentTitle title={`Moissonnage: ${harvest._id}`}>
        <div className={container}>
          <h1>
            <Link to={`/catalogs/${params.catalogId}`}>{catalog.name}</Link>
          </h1>

          <p>Identifiant du moissonnage: {harvest._id}</p>
          <LastHarvestStatus harvest={harvest} />

          <div className={results}>
            <h2>{successful ? 'Résultats' : 'Logs'}</h2>
            {successful ? <HarvestResults logs={harvest.log}/> : <HarvestLogs logs={harvest.log}/>}
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default HarvestDetail
