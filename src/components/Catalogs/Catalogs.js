import React, { Component } from 'react'
import ContentLoader from '../Loader/ContentLoader'
import CatalogPreview from '../Catalog/CatalogPreview'
import { fetchCatalogs } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '2em',
  },
  loader: {
    textAlign: 'center',
    marginTop: '5em',
  },
}
class Catalogs extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchCatalogs(), this, 'catalogs');
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {

    if (!this.state.catalogs) return <div style={styles.loader}><ContentLoader /></div>

    return (
      <div className="catalogs">
        <div style={styles.container}>
          {this.state.catalogs.map((catalog, idx) => <CatalogPreview key={idx} catalog={catalog} />)}
        </div>
      </div>
    )
  }
}

export default Catalogs
