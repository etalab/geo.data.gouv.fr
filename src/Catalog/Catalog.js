import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import { Link } from 'react-router'
import LastHarvesting from '../LastHarvesting/LastHarvesting'
import Counter from '../Statistics/Counter/Counter'
import Percent from '../Statistics/Percent/Percent'
import { fetchMetrics, cancelAllPromise } from '../fetch/fetch'

class Catalog extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return fetchMetrics(this, this.props.catalog.id)
  }

  componentWillUnmount() {
    return cancelAllPromise(this)
  }

  render() {
      const metrics = this.state.metrics
      const loader =  <CircularProgress size={1} />
      const openness = metrics ? <Percent value={metrics.partitions['openness'] ? metrics.partitions['openness'].yes : 0} total={metrics.totalCount} label="open data" icon="unlock alternate icon" size="small" /> : loader
      const download = metrics ? <Percent value={metrics.partitions['download'] ? metrics.partitions['download'].yes : 0} total={metrics.totalCount} label="downloadable" icon="download" size="small" /> : loader

      const styles = {
        link: {
          cursor: 'pointer',
          margin: '1em 3em 1em 3em',
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
                    <div className="column"><Counter value={this.props.catalog.lastHarvesting.recordsFound} size="small" label="Records" /></div>
                  </div>
                </div>
              </div>
            </Paper>
          </Link>
      )
  }
}

export default Catalog
