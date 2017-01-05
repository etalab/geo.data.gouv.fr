import React, { Component } from 'react'
import { get, sortBy, filter } from 'lodash'
import { computeCatalogScore } from '../../helpers/catalogs'
import ContentLoader from '../Loader/ContentLoader'
import { fetchCatalogs } from '../../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components';
import CatalogPreview from '../Catalog/CatalogPreview'
import { container, card, add, loader, warningMsg } from './AddCatalogs.css'

class AddCatalogs extends Component {
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
    const { sourceCatalogs, addCatalog } = this.props
    if (!this.state.catalogs) return <div className={loader}><ContentLoader /></div>

    const filteredCatalogs = filter(this.state.catalogs, catalog => !sourceCatalogs.includes(catalog.id))
    const opennedCatalogs = filter(filteredCatalogs, catalog =>
      get(catalog, 'metrics.datasets.partitions.openness.yes', 0) > 1 &&
      get(catalog, 'metrics.datasets.partitions.download.yes', 0) > 1
    )
    const sortedCatalogs = sortBy(opennedCatalogs, catalog => -computeCatalogScore(catalog))

    return (
      <div className={container}>
        {sortedCatalogs.map((catalog, idx) =>
          <div key={idx} className={card}>
            <CatalogPreview catalog={catalog} />
            <button className={add} onClick={() => addCatalog(catalog.id)}>Ajouter</button>
          </div>
          )}
        <div className={warningMsg}><i className="warning icon"></i>Seuls les catalogues disposant de données ouvertes et téléchargeables sont disponible ici.</div>
      </div>
    )
  }
}

export default AddCatalogs
