import React, { Component } from 'react'
import { Link } from 'react-router'
import LastHarvesting from '../LastHarvesting/LastHarvesting'
import Statistics from '../Statistics/Statistics'
import Percent from '../Statistics/Percent/Percent'
import './Catalog.css'

class Catalog extends Component {
  constructor(props) {
    super(props)
    this.state = {metrics: undefined}
    this.getMetrics()
  }

  getMetrics() {
    if (!this.state.metrics) {
      return fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${this.props.catalog.id}/metrics`)
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
      const loader = <div className="ui active big loader"></div>
      const openness = this.state.metrics ? <Percent metrics={this.state.metrics} label="openness" icon="users" size="small" /> : loader
      const download = this.state.metrics ? <Percent metrics={this.state.metrics} label="download" icon="download" size="small" /> : loader

      return (
          <Link to={`catalog/${this.props.catalog.id}`}>
            <div className="ui segment">
              <LastHarvesting harvest={this.props.catalog.lastHarvesting}/>
              <div className="ui equal width grid container">
                <div className="column">
                  <span className="ui large header">{this.props.catalog.name}</span>
                </div>
                <div className="column"></div>
                <div className="column">{openness}</div>
                <div className="column">{download}</div>
                <div className="column"><Statistics value={this.props.catalog.lastHarvesting.recordsFound} size="small" label="Entries" /></div>
              </div>
            </div>
          </Link>
      )
  }
}

export default Catalog
