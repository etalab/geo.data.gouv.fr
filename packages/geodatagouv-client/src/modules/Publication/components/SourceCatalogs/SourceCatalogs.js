/* eslint-disable react/prop-types */

import React, { Component } from 'react'
import { pull } from 'lodash'

import AddCatalogs from '../../components/AddCatalogs/AddCatalogs'
import Catalog from '../../components/Catalog/Catalog'

import AddButton from '../../../../components/Buttons/AddButton'
import RemoveButton from '../../../../components/Buttons/RemoveButton'
import Errors from '../../../../components/Errors/Errors'

import { updateOrganizationAccount } from '../../../../fetch/fetch'

import { catalogsStyle, catalog, buttonStyle, remove } from './SourceCatalogs.scss'

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
    const displayCatalogsButton = <AddButton action={() => this.toggleCatalogList()} text={'Ajouter des catalogues'} />
    const moreCatalogs = <AddCatalogs sourceCatalogs={catalogs} addCatalog={(catalogId) => this.addCatalog(catalogId)} />

    return (
      <div>
        <div className={catalogsStyle}>
          {catalogs.map(id =>
            <div key={id} className={catalog}>
              <Catalog catalogId={id} size={'small'} />
              <RemoveButton style={remove} action={() => this.removeCatalog(id)} text={'Supprimer'} />
            </div>
          )}
        </div>

        <div className={buttonStyle}>
          {!displayCatalogs ? displayCatalogsButton : moreCatalogs}
        </div>
      </div>
    )
  }
}

export default SourceCatalogs
