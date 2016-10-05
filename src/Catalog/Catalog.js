import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import { Link } from 'react-router'
import LastHarvesting from '../LastHarvesting/LastHarvesting'
import Statistics from '../Statistics/Statistics'
import Percent from '../Statistics/Percent/Percent'

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
      const loader =  <CircularProgress size={1} />
      const openness = this.state.metrics ? <Percent metrics={this.state.metrics} label="openness" icon="unlock alternate icon" size="small" /> : loader
      const download = this.state.metrics ? <Percent metrics={this.state.metrics} label="download" icon="download" size="small" /> : loader

      const styles = {
        link: {
          cursor: 'pointer',
          margin: 100,
        },
      }
      return (
          <Link to={`/catalogs/${this.props.catalog.id}`} style={styles.link}>
            <Paper rounded={true} zDepth={2} className="ui segment">
              <LastHarvesting harvest={this.props.catalog.lastHarvesting}/>
              <div className="ui grid container">
                <div className="six wide column">
                  <span className="ui large header">{this.props.catalog.name}</span>
                </div>
                <div className="ten wide column">
                  <div className="ui equal width grid">
                    <div className="column">{openness}</div>
                    <div className="column">{download}</div>
                    <div className="column"><Statistics value={this.props.catalog.lastHarvesting.recordsFound} size="small" label="Records" /></div>
                  </div>
                </div>
              </div>
            </Paper>
          </Link>
      )
  }
}

export default Catalog
