import React from 'react'
import PropTypes from 'prop-types'

import { _get } from '../lib/fetch'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'
import Box from '../components/box'
import HarvestStatus from '../components/harvest-status'

import Header from '../components/harvest/header'

import { GEODATA_API_URL } from '@env'

class HarvestPage extends React.Component {
  static propTypes = {
    catalog: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    harvest: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired,

    t: PropTypes.func.isRequired
  }

  static async getInitialProps({ query }) {
    const [catalog, harvest] = await Promise.all([
      _get(`${GEODATA_API_URL}/catalogs/${query.cid}`),
      _get(`${GEODATA_API_URL}/services/${query.cid}/synchronizations/${query.hid}`)
    ])

    return {
      catalog,
      harvest
    }
  }

  render() {
    const { catalog, harvest, t } = this.props

    return (
      <Page>
        <Meta title={t('harvest.title', { name: catalog.name })} />

        <Content clouds>
          <Container>
            <Box>
              <Header catalog={catalog} />

              <HarvestStatus harvest={harvest} />
              <div>
                {t('harvest.idLabel')} <b><code>{harvest._id}</code></b>
              </div>
            </Box>
          </Container>
        </Content>
      </Page>
    )
  }
}

export default withI18n('catalogs')(HarvestPage)
