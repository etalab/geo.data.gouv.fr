import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router'
import LastHarvesting from '../LastHarvesting/LastHarvesting'
import Loader from '../Loader/Loader'
import Counter from '../Statistics/Counter/Counter'
import Percent from '../Statistics/Percent/Percent'
import { fetchMetrics } from '../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../helpers/components';

class Catalog extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchMetrics(this.props.catalog.id), this, 'metrics');
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
      const metrics = this.state.metrics
      const openness = metrics ? <Percent value={metrics.partitions['openness'] ? metrics.partitions['openness'].yes : 0} total={metrics.totalCount} label="open data" icon="unlock alternate icon" size="small" /> : <div></div>
      const download = metrics ? <Percent value={metrics.partitions['download'] ? metrics.partitions['download'].yes : 0} total={metrics.totalCount} label="downloadable" icon="download" size="small" /> : <div></div>
      const counter = metrics ? <Counter value={metrics.totalCount} size="small" label="Records" /> : <div></div>

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
                    <div className="column">
                      <Loader value={metrics} component={openness} />
                    </div>
                    <div className="column">
                      <Loader value={metrics} component={download} />
                    </div>
                    <div className="column">
                      <Loader value={metrics} component={counter} />
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </Link>
      )
  }
}

export default Catalog
