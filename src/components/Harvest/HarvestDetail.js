import React, { Component } from 'react'
import { Link } from 'react-router'
import { fetchCatalog, fetchHarvest } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import LastHarvestStatus from '../LastHarvestStatus/LastHarvestStatus'
import HarvestLogs from './HarvestLogs'
import HarvestResults from './HarvestResults'
import { container, results } from './HarvestDetail.css'

class HarvestDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentDidMount() {
    document.title = 'Détails moissonnage'
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

    if (harvest && catalog) {
      const successful = harvest.status === 'successful'

      return (
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
    )} else {
      return <div></div>
    }
  }
}

export default HarvestDetail
