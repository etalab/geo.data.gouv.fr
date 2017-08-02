/* eslint-disable react/prop-types */

import React, { Component } from 'react'

import CatalogPreview from '../../../../components/CatalogPreview/CatalogPreview'

import { fetchCatalog } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

class Catalog extends Component {
  constructor(props) {
    super(props)
    this.state = { catalog: null, errors: [] }
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchCatalog(this.props.catalogId), this, 'catalog')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    const { catalog } = this.state

    if (catalog) return <CatalogPreview catalog={catalog} />
    return null
  }
}

export default Catalog
