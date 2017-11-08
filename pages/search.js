import { stringify } from 'querystring'
import React from 'react'
import PropTypes from 'prop-types'

import { _get } from '../lib/fetch'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Content from '../components/content'
import Container from '../components/container'
import Meta from '../components/meta'

import Header from '../components/search/header'
import Results from '../components/search/results'

import { GEODATA_API_URL } from '@env'

class SearchPage extends React.Component {
  static propTypes = {
    result: PropTypes.shape({
      query: PropTypes.shape({
        q: PropTypes.string
      }).isRequired,

      results: PropTypes.array.isRequired
    }).isRequired,

    t: PropTypes.func.isRequired
  }

  static async getInitialProps({ query }) {
    let page = parseInt(query.p, 10) || 1
    if (page < 1) {
      page = 1
    }

    const result = await _get(`${GEODATA_API_URL}/records?${stringify({
      q: query.q,
      limit: 20,
      offset: (page - 1) * 20
    })}`)

    return {
      result
    }
  }

  render() {
    const { result: { query, results }, t } = this.props

    return (
      <Page>
        <Meta title={t('title', {
          query: query.q,
          context: !query.q && 'empty'
        })} />
        <Content>
          <Container fluid>
            <Header />

            <Results results={results} />
          </Container>
        </Content>
      </Page>
    )
  }
}

export default withI18n('search')(SearchPage)
