import React, { Component } from 'react'
import Loader from '../Loader/Loader'
import { Link } from 'react-router'
import CatalogPreview from './CatalogPreview/CatalogPreview'
import LastHarvesting from '../LastHarvesting/LastHarvesting'
import { fetchMetrics } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import { theme } from '../../tools'

const styles = {
  link: {
    cursor: 'pointer',
    margin: '1em 3em',
    display: 'inline-block',
    width: '300px',
    position: 'relative',
  },
  title: {
    fontSize: '1.4em',
  },
  paper: {
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: theme.boxShadowZ1,
  },
  lastHarvesting: {
    fontSize: '0.8em',
  },
  catalogPreview: {
    marginTop: '1em',
  },
}

class Catalog extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return waitForDataAndSetState(fetchMetrics(this.props.catalog.id), this, 'metrics')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  render() {
      const catalogPreview = <CatalogPreview style={styles.catalogPreview} metrics={this.state.metrics} />

      return (
          <Link to={`/catalogs/${this.props.catalog.id}`} style={styles.link}>
            <div style={styles.paper}>
              <div style={styles.title}>{this.props.catalog.name}</div>
              <LastHarvesting style={styles.lastHarvesting} harvest={this.props.catalog.lastHarvesting}/>
              <Loader value={this.state.metrics} component={catalogPreview}/>
            </div>
          </Link>
      )
  }
}

export default Catalog
