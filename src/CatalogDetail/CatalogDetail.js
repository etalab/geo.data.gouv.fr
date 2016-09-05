import React, { Component } from 'react'
import Header from '../Header/Header'
import Partitions from '../Partitions/Partitions'
import Percent from '../Percent/Percent'
import Organizations from '../Organizations/Organizations'

class CatalogDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {catalog: undefined, metrics: undefined}
  }

  getCatalog() {
    if (!this.state.catalog) {
      console.log('getCatalog');
    return fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${this.props.params.id}`)
      .then((response) => response.json())
      .then((catalog) => {
        this.setState({catalog})
      })
      .catch((err) => {
        console.error(err)
      })
    }
  }

  getMetrics() {
    if (!this.state.metrics) {
      console.log('getMetrics');
      return fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${this.props.params.id}/metrics`)
        .then((response) => response.json())
        .then((metrics) => {
          this.setState({metrics})
        })
        .catch((err) => {
          console.error(err)
        })
      }
  }

  render() {
    if (this.state.catalog && this.state.metrics) {
      console.log('render');
      return (
        <div>
        <Header />
        <h1 className="ui center aligned header">{this.state.catalog.name}</h1>
        <div className="ui container">
          <div className="ui segments">
            <div className="ui segment">
              <Partitions data={this.state.metrics.partitions.recordType} />
            </div>
            <div className="ui segments">
              <div className="ui segment">
              </div>
            </div>
            <div className="ui horizontal segments">
              <div className="ui segment">
                <Organizations label="Organizations" organizations={this.state.metrics.counts.organizations} />
              </div>
              <div className="ui segment">
                <Percent metrics={this.state.metrics} label="openness" icon="users" />
              </div>
              <div className="ui segment">
                <Percent metrics={this.state.metrics} label="download" icon="download" />
              </div>
            </div>
            <div className="ui segment">
              <Organizations label="Keywords" organizations={this.state.metrics.counts.keywords} />
            </div>
          </div>
        </div>
        </div>
      )
    } else {
      this.getCatalog()
      this.getMetrics()
      return (<div></div>)
    }
  }
}

export default CatalogDetail
