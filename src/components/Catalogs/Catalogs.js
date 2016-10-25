import React, { Component } from 'react'
import ContentLoader from '../Loader/ContentLoader'
import Catalog from '../Catalog/Catalog'
import { fetchCatalogs } from '../../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components';

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
    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingTop: '2em',
      },
    }

    if (!this.state.catalogs) return <ContentLoader />
    return (
      <div className="catalogs">
        <div style={styles.container}>
          {this.state.catalogs.map((catalog, idx) => <Catalog key={idx} catalog={catalog} />)}
        </div>
      </div>
    )
  }
}

export default Catalogs
