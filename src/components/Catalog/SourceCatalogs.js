import React, { Component } from 'react'
import { pull } from 'lodash'
import AddCatalogs from '../Catalogs/AddCatalogs'
import Catalog from '../Catalog/Catalog'
import AddButton from '../Buttons/AddButton'
import RemoveButton from '../Buttons/RemoveButton'
import Errors from '../Errors/Errors'
import { updateCatalogSources  } from '../../fetch/fetch'
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

  toggleCatalogList() {
    this.setState({displayCatalogs: !this.state.displayCatalogs})
  }

  addCatalog(catalogId) {
    const { catalogs } = this.state
    const { organizationId } = this.props

    if (!catalogs.includes(catalogId)) {
      const newCatalogs = [...catalogs, catalogId]
      updateCatalogSources(newCatalogs, organizationId)
      .then(() => this.setState({catalogs: newCatalogs}))
    }
  }

  removeCatalog(catalogId) {
    const { catalogs } = this.state
    const { organizationId } = this.props

    if (catalogs.includes(catalogId)) {
      const newCatalogs = pull(catalogs, catalogId)
      updateCatalogSources(newCatalogs, organizationId)
      .then(() => this.setState({catalogs: newCatalogs}))
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
              <RemoveButton style={remove} action={() => this.removeCatalog(id)} text={'Supprimer'}/>
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
