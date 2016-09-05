import React, { Component } from 'react'
import Header from '../Header/Header'
import Partitions from '../Partitions/Partitions'
import Percent from '../Percent/Percent'
import Organizations from '../Organizations/Organizations'

class CatalogDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {catalog: {}}
    this.getData()
  }

  getData() {
    console.log(`https://inspire.data.gouv.fr/api/geogw/catalogs/${this.props.params.id}`);
    return fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${this.props.params.id}`)
      .then((response) => response.json())
      .then((catalog) => {
        this.setState({catalog})
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    const partitions = this.state.catalog.catalogMetrics.partitions
    return (
      <div>
      <Header />
      <h1 className="ui center aligned header">{this.state.catalog.name}</h1>
      <div className="ui container">
        <div className="ui segments">
          <div className="ui segment">
            <Partitions data={partitions.recordType} />
          </div>
          <div className="ui segments">
            <div className="ui segment">
            </div>
          </div>
          <div className="ui horizontal segments">
            <div className="ui segment">
              <Organizations label="Organizations" organizations={this.state.catalog.catalogMetrics.counts.organizations} />
            </div>
            <div className="ui segment">
              <Percent metrics={this.state.catalog.catalogMetrics} label="open" icon="users" />
            </div>
            <div className="ui segment">
              <Percent metrics={this.state.catalog.catalogMetrics} label="download" icon="download" />
            </div>
          </div>
          <div className="ui segment">
            <Organizations label="Keywords" organizations={this.state.catalog.catalogMetrics.counts.keywords} />
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default CatalogDetail
