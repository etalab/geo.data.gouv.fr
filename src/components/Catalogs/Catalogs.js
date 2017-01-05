import React, { Component } from 'react'
import { getCatalogOrderByScore } from '../../helpers/catalogs'
import ContentLoader from '../Loader/ContentLoader'
import { fetchCatalogs } from '../../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components';
import CatalogPreview from '../Catalog/CatalogPreview'
import { container, loader } from './Catalogs.css'

class Catalogs extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentDidMount() {
    document.title = 'Catalogues'
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchCatalogs(), this, 'catalogs')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
    if (!this.state.catalogs) return <div className={loader}><ContentLoader /></div>

    const sortedCatalogs = getCatalogOrderByScore(this.state.catalogs)

    return (
      <div className={container}>
        {sortedCatalogs.map((catalog, idx) => <CatalogPreview key={idx} catalog={catalog} />)}
      </div>
    )
  }
}

export default Catalogs
