import React, { Component } from 'react'

class CatalogDetail extends Component {
  render() {
    return (
      <div className="catalog-detail">
        <h1>{this.props.params.catalogName}</h1>
      </div>
    )
  }
}

export default CatalogDetail
