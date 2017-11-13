import React from 'react'
import PropTypes from 'prop-types'

import { _get } from '../lib/fetch'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'
import Box from '../components/box'
import SearchInput from '../components/search-input'

import Header from '../components/catalog/header'
import Statistics from '../components/catalog/statistics'
import Organizations from '../components/catalog/organizations'

import { GEODATA_API_URL } from '@env'

class CatalogPage extends React.Component {
  static propTypes = {
    catalog: PropTypes.shape({
      name: PropTypes.string.isRequired,
      metrics: PropTypes.shape({
        records: PropTypes.shape({
          counts: PropTypes.shape({
            organizations: PropTypes.object.isRequired
          }).isRequired
        }).isRequired
      }).isRequired
    }).isRequired,

    t: PropTypes.func.isRequired
  }

  static async getInitialProps({ query }) {
    const catalog = await _get(`${GEODATA_API_URL}/catalogs/${query.id}`)

    return {
      catalog
    }
  }

  render() {
    const { catalog, t } = this.props

    return (
      <Page>
        <Meta title={t('details.title', { name: catalog.name })} />

        <Content>
          <Container>
            <Box>
              <Header catalog={catalog} />
              <Statistics metrics={catalog.metrics} />

              <h3>{t('details.search')}</h3>
              <SearchInput hasButton defaultQuery={{
                catalog: catalog.name
              }} />

              <h3>{t('details.organizations')}</h3>
              <Organizations organizations={catalog.metrics.records.counts.organizations} />
            </Box>
          </Container>
        </Content>
      </Page>
    )
  }
}

export default withI18n('catalogs')(CatalogPage)
