import React, { Component } from 'react'
import Catalog from '../Catalog/Catalog'
import './Content.css'

const data = require("json!../../resources/data.json");

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {catalogs: Object.keys(data).map((key) => {
          return data[key]
        })}
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
