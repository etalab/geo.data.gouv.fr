import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Section from '../Section/Section'
import CatalogSection from '../Section/CatalogSection/CatalogSection'
import StatisticsSection from '../Section/StatisticsSection/StatisticsSection'
import OrganizationsSection from '../Section/OrganizationsSection/OrganizationsSection'
import HarvestsSection from '../Section/HarvestsSection/HarvestsSection'
import fetchCatalog from '../fetch/fetchCatalog'
import fetchMetrics from '../fetch/fetchMetrics'

class CatalogDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {catalog: undefined, metrics: undefined}
  }

  componentWillMount() {
    return fetchCatalog(this.props.params.catalogId)
      .then(catalog => {
        this.setState({ catalog })
      })
      .then(fetchMetrics(this.props.params.catalogId)
        .then(metrics => {
          this.setState({ metrics })
        }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.catalog && this.state.metrics) {
      const styles = {
        catalogDetail : {
          padding: 40,
          display: 'block',
        },
      };

      return (
        <Paper style={styles.catalogDetail} id="catalog-detail">
          <Section title="Catalog" component={<CatalogSection catalog={this.state.catalog} />} />
          <Section title="Statistics" component={<StatisticsSection metrics={this.state.metrics} />} />
          <Section title="Counts" component={<OrganizationsSection metrics={this.state.metrics} />} />
          <Section title="Harvests" component={<HarvestsSection catalog={this.state.catalog} />} />
        </Paper>
      )
    } else {
      return (<div></div>)
    }
  }
}

export default CatalogDetail
