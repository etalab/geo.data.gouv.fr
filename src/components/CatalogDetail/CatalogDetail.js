import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'react-router'
import SearchInput from '../SearchInput/SearchInput'
import ContentLoader from '../Loader/ContentLoader'
import CatalogSection from '../Section/CatalogSection/CatalogSection'
import StatisticsSection from '../Section/StatisticsSection/StatisticsSection'
import OrganizationsSection from '../Section/OrganizationsSection/OrganizationsSection'
import HarvestsSection from '../Section/HarvestsSection/HarvestsSection'
import { fetchCatalog, fetchMetrics } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import { section, sectionNoPadding, container, loader} from './CatalogDetail.css'

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
    return waitForDataAndSetState(fetchMetrics(this.props.params.catalogId), this, 'metrics')
  }

  updateCatalog() {
    return waitForDataAndSetState(fetchCatalog(this.props.params.catalogId), this, 'catalog')
  }

  userSearch(path, textInput) {
    browserHistory.push({ pathname: '/datasets', query: {q: textInput, catalog: this.state.catalog.name} })
  }

  render() {
    const { catalog, metrics } = this.state

    if (!catalog || !metrics) return <div className={loader}><ContentLoader /></div>

    return (
      <DocumentTitle title={catalog.name}>
        <div className={container}>
          <div className={sectionNoPadding}>
            <CatalogSection catalog={catalog} />
            <StatisticsSection metrics={metrics} />
          </div>

          <div className={section}><OrganizationsSection metrics={metrics} catalog={catalog}/></div>
          <div className={section}><HarvestsSection catalog={catalog} /></div>

          <div className={section}>
            <h2>Rechercher dans les jeux de données du catalogue</h2>
            <SearchInput ref="searchInput" handleTextChange={(textInput) => this.userSearch('datasets', textInput)} searchButton={true}/>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

export default CatalogDetail
