import React, { Component } from 'react'
import Catalog from '../Catalog/Catalog'
import { fetchCatalogs, cancelAllPromise } from '../fetch/fetch'

class Catalogs extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return fetchCatalogs(this)
  }

  componentWillUnmount() {
    return cancelAllPromise(this)
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

    if (this.state.catalogs) {
      return (
        <div className="catalogs">
          <div style={styles.container}>
            {this.state.catalogs.map((catalog, idx) => <Catalog key={idx} catalog={catalog} />)}
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

export default Catalogs
