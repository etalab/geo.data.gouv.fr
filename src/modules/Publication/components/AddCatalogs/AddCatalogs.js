import React, { Component } from 'react'

import ContentLoader from '../../../../components/Loader/ContentLoader'
import AddButton from '../../../../components/Buttons/AddButton'
import CatalogPreview from '../../../../components/CatalogPreview/CatalogPreview'

import { fetchCatalogs } from '../../../../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components';
import { getCatalogOrderByScore, getCandidateCatalogs } from '../../../../helpers/catalogs'

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
            <AddButton style={add} action={() => addCatalog(catalog.id)} text={'Ajouter'} />
          </div>
          )}
        <div className={warningMsg}><i className="warning icon"></i>Seuls les catalogues disposant de données ouvertes et téléchargeables sont disponible ici.</div>
      </div>
    )
  }
}

export default AddCatalogs
