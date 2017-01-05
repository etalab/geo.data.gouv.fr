import React, { Component } from 'react'
import { pull } from 'lodash'
import AddCatalogs from '../Catalogs/AddCatalogs'
import Catalog from '../Catalog/Catalog'
import Errors from '../Errors/Errors'
import { updateCatalogSource  } from '../../fetch/fetch'
import { catalogsStyle, divider, catalog, remove } from './SourceCatalogs.css'

class SourceCatalogs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      catalogs: [...this.props.sourceCatalogs],
      displayCatalogs: false,
      errors: []
    }
  }

  displayCatalogs() {
    this.setState({displayCatalogs: !this.state.displayCatalogs})
  }

  addCatalog(catalogId) {
    const { catalogs } = this.state
    const { organizationId } = this.props

    if (!catalogs.includes(catalogId)) {
      const newCatalogs = [...catalogs, catalogId]
      updateCatalogSource(newCatalogs, organizationId)
      .then(() => this.setState({catalogs: newCatalogs}))
    }
  }

  removeCatalog(catalogId) {
    const { catalogs } = this.state
    const { organizationId } = this.props

    if (catalogs.includes(catalogId)) {
      const newCatalogs = pull(catalogs, catalogId)
      updateCatalogSource(newCatalogs, organizationId)
      .then(() => this.setState({catalogs: newCatalogs}))
    }
  }

  render() {
    const { displayCatalogs, catalogs, errors } = this.state

    if (errors.length) return <Errors errors={errors} />
    const displayCatalogsButton = <button onClick={() => this.displayCatalogs()}>Ajouter des catalogues</button>
    const moreCatalogs = <AddCatalogs sourceCatalogs={catalogs} addCatalog={(catalogId) => this.addCatalog(catalogId)} />

    return (
      <div>
        <div className={catalogsStyle}>
          {catalogs.map(id =>
            <div key={id} className={catalog}>
              <Catalog catalogId={id} size={'small'} />
              <button className={remove} onClick={() => this.removeCatalog(id)}>Supprimer</button>
            </div>
            )}
        </div>
        <hr className={divider} />
        {!displayCatalogs ? displayCatalogsButton : moreCatalogs}
      </div>
    )
  }
}

export default SourceCatalogs
