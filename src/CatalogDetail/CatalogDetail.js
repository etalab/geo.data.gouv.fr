import React, { Component } from 'react'
import Header from '../Header/Header'
import PieChart from '../Charts/PieChart/PieChart'
import BarChart from '../Charts/BarChart/BarChart'
import Percent from '../Percent/Percent'
import Organizations from '../Organizations/Organizations'

class CatalogDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {catalog: undefined, metrics: undefined}
  }

  getCatalog() {
    if (!this.state.catalog) {
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
      return (
        <div>
        <Header />

        <div className="ui grid container">

          <div className="sixteen wide column"></div>

          <div className="ten wide column">
            <div className="ui header">Organization</div>
            <div className="ui divider"></div>
            <div className="ui header">{this.state.catalog.name}</div>
            <div className="ui sub">
              <a href={this.state.catalog.serviceUrl}>{this.state.catalog.serviceUrl}</a>
            </div>
          </div>

          <div className="six wide column">
          <div className="ui header">Record Type</div>
          <div className="ui divider"></div>
            <PieChart data={this.state.metrics.partitions.recordType} />
          </div>

          <div className="sixteen wide column"></div>

          <div className="sixteen wide column">
            <div className="ui header">Data Type</div>
            <div className="ui divider"></div>
          </div>

          <div className="center aligned three column row">
            <div className="column">
              <Percent metrics={this.state.metrics} label="openness" icon="users" />
            </div>

            <div className="column">
              <BarChart data={this.state.metrics.partitions.dataType} />
            </div>

            <div className="column">
              <Percent metrics={this.state.metrics} label="download" icon="download" />
            </div>
          </div>

          <div className="sixteen wide column">
            <div className="ui header">Counts</div>
            <div className="ui divider"></div>
          </div>

          <div className="two column row">
            <div className="column">
              <Organizations label="Organizations" organizations={this.state.metrics.counts.organizations} />
            </div>

            <div className="column">
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
