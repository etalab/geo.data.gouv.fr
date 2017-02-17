import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'

// Import Shared Components
import CatalogPreviewList from '../../../../components/CatalogPreview/CatalogPreviewList'

// Import Helpers
import { fetchCatalogs } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

// Import CSS
import { container } from './Catalogs.css'

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
    const { catalogs } = this.state

    return (
      <DocumentTitle title={'Catalogues'}>
        <div className={container}>
          <CatalogPreviewList catalogs={catalogs} />
        </div>
      </DocumentTitle>
    )
  }
}

export default Catalogs
