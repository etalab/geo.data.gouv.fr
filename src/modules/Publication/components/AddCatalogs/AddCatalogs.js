/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import Loader from '../../../../components/Loader'
import Button from '../../../../components/Buttons/Button'
import CatalogPreview from '../../../../components/CatalogPreview/CatalogPreview'

import { fetchCatalogs } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'
import { getCatalogOrderByScore, getCandidateCatalogs } from '../../../../helpers/catalogs'

import styles from './AddCatalogs.scss'

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
    if (!this.state.catalogs) return <Loader isLoading className={styles.loader} />

    const candidateCatalogs = getCandidateCatalogs(catalogs, sourceCatalogs)
    const sortedCatalogs = getCatalogOrderByScore(candidateCatalogs)

    return (
      <div className={styles.container}>
        {sortedCatalogs.map((catalog, idx) =>
          <div key={idx} className={styles.card}>
            <CatalogPreview catalog={catalog} />
            <Button action={() => addCatalog(catalog.id)} text={'Ajouter'} icon='plus' />
          </div>
        )}
        <div className={styles.warningMsg}><i className='styles.warning icon' />Seuls les catalogues disposant de données ouvertes et téléchargeables sont disponible ici.</div>
      </div>
    )
  }
}

export default AddCatalogs
