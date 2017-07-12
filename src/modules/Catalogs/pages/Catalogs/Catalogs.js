import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

// Import Shared Components
import CatalogPreview from '../../../../components/CatalogPreview/CatalogPreview'
import ContentLoader from '../../../../components/Loader/ContentLoader'

// Import Helpers
import { fetchCatalogs } from '../../../../fetch/fetch';
import { getCatalogOrderByScore } from '../../../../helpers/catalogs'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components';

// Import CSS
import { container, loader } from './Catalogs.scss'

class Catalogs extends Component {
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
    if (!this.state.catalogs) return <div className={loader}><ContentLoader /></div>

    const sortedCatalogs = getCatalogOrderByScore(this.state.catalogs)

    return (
      <DocumentTitle title={'Catalogues'}>
        <div className={container}>
          {sortedCatalogs.map((catalog, idx) => <CatalogPreview key={idx} catalog={catalog} />)}
        </div>
      </DocumentTitle>
    )
  }
}

export default Catalogs
