/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import Loader from '../../../../components/Loader'
import AddButton from '../../../../components/Buttons/AddButton'
import CatalogPreview from '../../../../components/CatalogPreview/CatalogPreview'

import { fetchCatalogs } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'
import { getCatalogOrderByScore, getCandidateCatalogs } from '../../../../helpers/catalogs'

import { container, card, add, loader, warningMsg } from './AddCatalogs.scss'

class AddCatalogs extends Component {
  constructor(props) {
    super(props)
    this.state = { errors: [] }
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
    if (!this.state.catalogs) return <Loader isLoading className={loader} />

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
        <div className={warningMsg}><i className='warning icon' />Seuls les catalogues disposant de données ouvertes et téléchargeables sont disponible ici.</div>
      </div>
    )
  }
}

export default AddCatalogs
