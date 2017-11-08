import React from 'react'
import PropTypes from 'prop-types'

import { _get } from '../lib/fetch'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'

import { GEODATA_API_URL } from '@env'

class DatasetPage extends React.Component {
  static propTypes = {
    dataset: PropTypes.shape({
      metadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  static async getInitialProps({ query }) {
    const dataset = await _get(`${GEODATA_API_URL}/records/${query.id}`)

    return {
      dataset
    }
  }

  render() {
    const { dataset: { metadata } } = this.props

    return (
      <Page>
        <Meta title={metadata.title} />

        <Content>
          <Container>
            {metadata.title}
          </Container>
        </Content>
      </Page>
    )
  }
}

export default withI18n()(DatasetPage)
