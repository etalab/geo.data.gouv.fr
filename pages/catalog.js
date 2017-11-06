import React from 'react'
import PropTypes from 'prop-types'

import { _get } from '../lib/fetch'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'

import Header from '../components/catalog/header'

import { GEODATA_API_URL } from '@env'

class CatalogPage extends React.Component {
  static propTypes = {
    catalog: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),

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
            <Header catalog={catalog} />
          </Container>
        </Content>
      </Page>
    )
  }
}

export default withI18n('catalogs')(CatalogPage)
