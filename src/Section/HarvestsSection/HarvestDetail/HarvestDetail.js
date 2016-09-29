import React, { Component } from 'react'

class HarvestDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {harvest: undefined}
    this.getLogs()
    this.getCatalog()
  }

  getCatalog() {
    if (!this.state.catalog) {
    return fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${this.props.params.catalogId}`)
      .then((response) => response.json())
      .then((catalog) => {
        this.setState({catalog})
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }

  getLogs() {
    if (!this.state.harvest) {
      return fetch(`https://inspire.data.gouv.fr/api/geogw/services/${this.props.params.catalogId}/synchronizations/${this.props.params.harvestId}`)
        .then((response) => response.json())
        .then((harvest) => {
          this.setState({harvest})
        })
        .catch((err) => {
          console.error(err)
        })
      }
  }

  render() {
    if (this.state.harvest) {
      return (
        <div className="harvest-detail">

          <h1 className="ui header">Catalog</h1>
          <div className="ui divider"></div>
          <h2>{this.state.catalog.name}</h2>

          <h1 className="ui header">Status</h1>
          <div className="ui divider"></div>
          <h2>{this.state.harvest.status}</h2>

        <div className="ui padded vertical segment">
            <div className="ui header">Logs</div>
            <div className="ui divider"></div>
            {this.state.harvest.log.map((log, idx) => <pre key={idx}><code>{log}</code></pre>)}
          </div>
        </div>
    )} else {
      return <div></div>
    }
  }
}

export default HarvestDetail
