import { stringify } from 'querystring'
import React from 'react'
import PropTypes from 'prop-types'

import { _get } from '../lib/fetch'
import { getFilters } from '../lib/query'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Content from '../components/content'
import Container from '../components/container'
import Meta from '../components/meta'
import SearchInput from '../components/search-input'

import ActiveFacets from '../components/search/active-facets'
import Count from '../components/search/count'
import Results from '../components/search/results'
import Facets from '../components/search/facets'

import { GEODATA_API_URL } from '@env'

class SearchPage extends React.Component {
  static propTypes = {
    result: PropTypes.shape({
      query: PropTypes.shape({
        q: PropTypes.string,
        facets: PropTypes.array.isRequired
      }).isRequired,
      results: PropTypes.array.isRequired,
      count: PropTypes.number.isRequired,
      facets: PropTypes.object.isRequired
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
      offset: (page - 1) * 20,
      ...getFilters(query)
    })}`)

    return {
      result
    }
  }

  render() {
    const { result: { query, results, count, facets }, t } = this.props

    return (
      <Page>
        <Meta title={t('title', {
          query: query.q,
          context: !query.q && 'empty'
        })} />
        <Content>
          <Container fluid>
            <div className='main'>
              <div className='search'>
                <SearchInput hasButton />
                <ActiveFacets facets={query.facets} />
                <Count count={count} />

                <Results results={results} />
              </div>
              <div className='facets'>
                <Facets facets={facets} active={query.facets} />
              </div>
            </div>
          </Container>
        </Content>

        <style jsx>{`
          .main {
            display: flex;
          }

          .search {
            flex: 1;
          }

          .facets {
            margin-left: 2em;
            flex-basis: 300px;
            flex-shrink: 0;
          }
        `}</style>
      </Page>
    )
  }
}

export default withI18n('search')(SearchPage)
