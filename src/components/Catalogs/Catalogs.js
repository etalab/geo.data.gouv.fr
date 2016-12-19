import React, { Component } from 'react'
import { sortBy } from 'lodash'
import { computeCatalogScore } from '../../helpers/catalogs'
import ContentLoader from '../Loader/ContentLoader'
import { fetchCatalogs } from '../../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components';
import CatalogPreview from '../Catalog/CatalogPreview'
import { container, loader } from './Catalogs.css'

class Catalogs extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchCatalogs(), this, 'catalogs')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    if (!this.state.catalogs) return <div className={loader}><ContentLoader /></div>

    const sortedCatalogs = sortBy(this.state.catalogs, catalog => -computeCatalogScore(catalog))

    return (
      <div className={container}>
        {sortedCatalogs.map((catalog, idx) => <CatalogPreview key={idx} catalog={catalog} />)}
      </div>
    )
  }
}

export default Catalogs
