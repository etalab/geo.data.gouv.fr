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
import Harvests from '../components/catalog/harvests'
import Organizations from '../components/catalog/organizations'

import { GEODATA_API_URL } from '@env'

class CatalogPage extends React.Component {
  static propTypes = {
    catalog: PropTypes.shape({
      name: PropTypes.string.isRequired,
      metrics: PropTypes.object.isRequired
    }),
    t: PropTypes.func.isRequired
  }

  static async getInitialProps({ query }) {
    const catalog = await _get(`${GEODATA_API_URL}/catalogs/${query.id}`)

    return {
      catalog
    }
  }

  state = {
    harvests: null
  }

  async componentDidMount() {
    const { catalog } = this.props

    const harvests = await _get(`${GEODATA_API_URL}/services/${catalog.id}/synchronizations`)

    this.setState(() => ({
      harvests
    }))
  }

  render() {
    const { catalog, t } = this.props
    const { harvests } = this.state

    return (
      <Page>
        <Meta title={t('details.title', { name: catalog.name })} />

        <Content clouds>
          <Container>
            <Box>
              <Header catalog={catalog} />
              <Statistics metrics={catalog.metrics} />

              <h3>{t('details.harvests.title')}</h3>
              {harvests ? <Harvests catalog={catalog} harvests={harvests} /> : t('common:loading')}

              <h3>{t('details.search')}</h3>
              <SearchInput hasButton defaultQuery={{
                catalog: catalog.name
              }} />

              <h3>{t('details.organizations')}</h3>
              <Organizations catalog={catalog} />
            </Box>
          </Container>
        </Content>

        <style jsx>{`
          h3 {
            margin: 2.6em 0 1.4em;
          }
        `}</style>
      </Page>
    )
  }
}

export default withI18n('catalogs')(CatalogPage)
