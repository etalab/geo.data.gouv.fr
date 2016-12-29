import React, { Component } from 'react'
import UpdateHealth from './UpdateHealth'
import DatasetsHealth from './DatasetsHealth'
import CatalogSection from '../Section/CatalogSection/CatalogSection'
import { fetchCatalog } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import { container, sectionNoPadding, legend } from './HealthDetails.css'
import { success, warning, error } from './Health.css'

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

    if (!catalog) return null

    return (
      <div className={container}>
      <div className={sectionNoPadding}>

        <CatalogSection catalog={catalog} />
        <UpdateHealth catalog={catalog} />
        <DatasetsHealth catalog={catalog} />

        <div className={legend}>
          <div className={error}><i className="remove icon"></i>inférieur à 20%</div>
          <div className={warning}><i className="icon warning"></i>entre 20% et 55%</div>
          <div className={success}><i className="checkmark icon"></i>supérieur à 5%</div>
        </div>

      </div>
    </div>
  )
  }
}

export default HealthDetails
