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
    return fetch(`https://inspire.data.gouv.fr/api/geogw/catalogs/${this.props.catalog.id}/metrics`)
      .then((response) => response.json())
      .then((metrics) => {
        this.setState({metrics})
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    if (this.state.metrics) {
      return (
          <Link to={`catalog/${this.props.catalog.id}`}>
            <div className="ui segment">
              <LastHarvesting harvest={this.props.catalog.lastHarvesting}/>
              <div className="ui equal width grid container">
                <div className="column">
                  <span className="ui large header">{this.props.catalog.name}</span>
                </div>
                <div className="column"></div>
                <div className="column"><Percent metrics={this.state.metrics} label="openness" icon="users" size="small" /></div>
                <div className="column"><Percent metrics={this.state.metrics} label="download" icon="download" size="small" /></div>
                <div className="column"><Statistics value={this.props.catalog.lastHarvesting.recordsFound} size="small" label="Entries" /></div>
              </div>
            </div>
          </Link>
      )
    } else {
      return (<div></div>)
    }

  }
}

export default Catalog
