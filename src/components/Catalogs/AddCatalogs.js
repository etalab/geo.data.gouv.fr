import React, { Component } from 'react'
import { getCatalogOrderByScore, getCandidateCatalogs } from '../../helpers/catalogs'
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
    const { catalogs } = this.state
    const { sourceCatalogs, addCatalog } = this.props
    if (!this.state.catalogs) return <div className={loader}><ContentLoader /></div>

    const candidateCatalogs = getCandidateCatalogs(catalogs, sourceCatalogs)
    const sortedCatalogs = getCatalogOrderByScore(candidateCatalogs)

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
