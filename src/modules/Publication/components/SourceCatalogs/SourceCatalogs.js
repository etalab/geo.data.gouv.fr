/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import { pull } from 'lodash'

import AddCatalogs from '../../components/AddCatalogs/AddCatalogs'
import Catalog from '../../components/Catalog/Catalog'

import Button from '../../../../components/Buttons/Button'
import Errors from '../../../../components/Errors/Errors'

import { updateOrganizationAccount } from '../../../../fetch/fetch'

import styles from './SourceCatalogs.scss'

class SourceCatalogs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      catalogs: [...this.props.sourceCatalogs],
      displayCatalogs: false,
      errors: []
    }
  }

  toggleCatalogList() {
    this.setState({ displayCatalogs: !this.state.displayCatalogs })
  }

  addCatalog(catalogId) {
    const { catalogs } = this.state
    const { organizationId } = this.props

    if (!catalogs.includes(catalogId)) {
      const newCatalogs = [...catalogs, catalogId]
      updateOrganizationAccount(organizationId, { sourceCatalogs: newCatalogs })
        .then(() => this.setState({ catalogs: newCatalogs }))
    }
  }

  removeCatalog(catalogId) {
    const { catalogs } = this.state
    const { organizationId } = this.props

    if (catalogs.includes(catalogId)) {
      const newCatalogs = pull(catalogs, catalogId)
      updateOrganizationAccount(organizationId, { sourceCatalogs: newCatalogs })
        .then(() => this.setState({ catalogs: newCatalogs }))
    }
  }

  render() {
    const { displayCatalogs, catalogs, errors } = this.state

    if (errors.length) return <Errors errors={errors} />

    return (
      <div>
        <div className={styles.catalogsStyle}>
          {catalogs.map(id =>
            <div key={id} className={styles.catalog}>
              <Catalog catalogId={id} size={'small'} />
              <Button className={styles.remove} action={() => this.removeCatalog(id)} text={'Supprimer'} icon='trash' />
              {displayCatalogs
                ? <Button action={() => this.toggleCatalogList()} text={'Réduire'} icon='minus' />
                : <Button action={() => this.toggleCatalogList()} text={'Ajouter des catalogues'} icon='plus' />
              }
            </div>
          )}
          {displayCatalogs && <AddCatalogs sourceCatalogs={catalogs} addCatalog={(catalogId) => this.addCatalog(catalogId)} />}
        </div>
      </div>
    )
  }
}

export default SourceCatalogs
