import React from 'react'
import PropTypes from 'prop-types'

import { _get } from '../lib/fetch'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'
import Box from '../components/box'

import Header from '../components/catalog/header'
import Statistics from '../components/catalog/statistics'

import { GEODATA_API_URL } from '@env'

class CatalogPage extends React.Component {
  static propTypes = {
    catalog: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),

    t: PropTypes.func.isRequired
  }

  static async getInitialProps({ query }) {
    return {
      catalog: await _get(`${GEODATA_API_URL}/catalogs/${query.id}`),
      metrics: await _get(`${GEODATA_API_URL}/catalogs/${query.id}/metrics`)
    }
  }

  render() {
    const { catalog, metrics, t } = this.props

    return (
      <Page>
        <Meta title={t('details.title', { name: catalog.name })} />

        <Content>
          <Container>
            <Box>
              <Header catalog={catalog} />
              <Statistics metrics={metrics} />
            </Box>
          </Container>
        </Content>
      </Page>
    )
  }
}

export default withI18n('catalogs')(CatalogPage)
