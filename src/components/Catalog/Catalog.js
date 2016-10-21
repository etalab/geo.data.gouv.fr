import React, { Component } from 'react'
import Loader from '../Loader/Loader'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router'
import CatalogPreview from './CatalogPreview/CatalogPreview'
import LastHarvesting from '../LastHarvesting/LastHarvesting'
import { fetchMetrics } from '../../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components';

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
      const catalogPreview = <CatalogPreview metrics={this.state.metrics} />
      const styles = {
        link: {
          cursor: 'pointer',
          margin: '1em 3em 1em 3em',
          position: 'relative',
        },
        ribbon: {
          position: 'absolute',
          top: '1em',
          left: '-14px',
        },
        stats: {
          display: 'flex',
          felxWrap: 'wrap',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        title: {
          position: 'relative',
          justifyContent: 'center',
          width: '30%',
          top: '20px',
        },
      }
      return (
          <Link to={`/catalogs/${this.props.catalog.id}`} style={styles.link}>
            <Paper rounded={true} zDepth={2}>
              <LastHarvesting style={styles.ribbon} harvest={this.props.catalog.lastHarvesting}/>
              <div style={styles.stats}>
                <span style={styles.title} className="ui large header">{this.props.catalog.name}</span>
                <Loader value={this.state.metrics} component={catalogPreview}/>
              </div>
            </Paper>
          </Link>
      )
  }
}

export default Catalog
