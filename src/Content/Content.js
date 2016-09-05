import React, { Component } from 'react'
import Catalog from '../Catalog/Catalog'
import './Content.css'

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {catalogs: []}
    this.getCatalogs()
  }

  getCatalogs() {
    return fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs`)
      .then((response) => response.json())
      .then((catalogs) => {
        this.setState({catalogs})
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    return (
      <div className="ui main container">
        {this.state.catalogs.map((catalog, idx) => <Catalog key={idx} catalog={catalog} />)}
      </div>
    )
  }
}

export default Content
