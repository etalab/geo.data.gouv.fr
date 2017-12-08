import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'

import { _get, _post } from '../lib/fetch'
import { isObsolete } from '../lib/catalog'

import attachI18n from '../components/hoc/attach-i18n'
import attachSession from '../components/hoc/attach-session'

import ErrorPage from './_error'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'
import Box from '../components/box'
import SearchInput from '../components/search-input'
import Warning from '../components/warning'

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
    error: PropTypes.shape({
      code: PropTypes.number
    }),
    t: PropTypes.func.isRequired
  }

  static async getInitialProps({ res, query }) {
    try {
      return {
        catalog: await _get(`${GEODATA_API_URL}/catalogs/${query.cid}`)
      }
    } catch (err) {
      if (res) {
        res.statusCode = err.code
      }

      return {
        error: err
      }
    }
  }

  state = {
    harvestsPromise: null
  }

  componentDidMount() {
    const { catalog } = this.props

    if (catalog) {
      this.setState(() => ({
        harvestsPromise: _get(`${GEODATA_API_URL}/services/${catalog.id}/synchronizations`)
      }))
    }
  }

  runHarvest = () => {
    const { catalog } = this.props

    return _post(`${GEODATA_API_URL}/services/${catalog.id}/sync`)
  }

  render() {
    if (this.props.error) {
      return <ErrorPage code={this.props.error.code} />
    }

    const { catalog, t } = this.props
    const { harvestsPromise } = this.state

    return (
      <Page>
        <Meta title={t('details.title', { name: catalog.name })} />

        <Content clouds>
          <Container>
            <Box>
              <Header catalog={catalog} />
              {isObsolete(catalog) && (
                <Warning>{t('common:catalog.obsolete')}</Warning>
              )}
              <Statistics metrics={catalog.metrics} />

              <h3>{t('details.harvests.title')}</h3>
              <Harvests promise={harvestsPromise} catalog={catalog} runHarvest={this.runHarvest} />

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

export default flowRight(
  attachI18n('catalogs'),
  attachSession
)(CatalogPage)
