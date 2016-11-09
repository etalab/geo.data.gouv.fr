import React, { Component } from 'react'
import { parseQuery } from '../../helpers/urlParser'
import Datasets from './Datasets'

class WrappedDatasets extends Component {
  constructor(props) {
    super(props)
    this.state = { query: parseQuery(this.props.location.query) }
  }

  render() {
    return <Datasets query={this.state.query}/>
  }
}

export default WrappedDatasets
