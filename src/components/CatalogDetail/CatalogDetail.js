import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Section from '../Section/Section'
import CatalogSection from '../Section/CatalogSection/CatalogSection'
import StatisticsSection from '../Section/StatisticsSection/StatisticsSection'
import OrganizationsSection from '../Section/OrganizationsSection/OrganizationsSection'
import HarvestsSection from '../Section/HarvestsSection/HarvestsSection'
import { fetchCatalog, fetchMetrics } from '../../fetch/fetch';
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components';

class CatalogDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentWillMount() {
    return Promise.all([
      this.updateCatalog(),
      this.updateMetrics(),
    ])
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  updateMetrics() {
    return waitForDataAndSetState(fetchMetrics(this.props.params.catalogId), this, 'metrics');
  }

  updateCatalog() {
    return waitForDataAndSetState(fetchCatalog(this.props.params.catalogId), this, 'catalog');
  }

  render() {
    if (this.state.catalog && this.state.metrics) {
      const catalog = this.state.catalog
      const metrics = this.state.metrics
      const styles = {
        catalogDetail : {
          padding: 40,
          display: 'block',
        },
      }

      return (
        <Paper style={styles.catalogDetail} id="catalog-detail">
          <Section title="Catalog" component={<CatalogSection catalog={catalog} metrics={metrics} />} />
          <Section title="Statistics" component={<StatisticsSection metrics={metrics} />} />
          <Section title="Counts" component={<OrganizationsSection metrics={metrics} />} />
          <Section title="Harvests" component={<HarvestsSection catalog={catalog} />} />
        </Paper>
      )
    } else {
      return (<div></div>)
    }
  }
}

export default CatalogDetail
