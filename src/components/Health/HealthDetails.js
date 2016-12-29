import React, { Component } from 'react'
import UpdateHealth from './UpdateHealth'
import DatasetsHealth from './DatasetsHealth'
import CatalogSection from '../Section/CatalogSection/CatalogSection'
import { fetchCatalog } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import { container, sectionNoPadding } from './HealthDetails.css'

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

      </div>
    </div>
  )
  }
}

export default HealthDetails
