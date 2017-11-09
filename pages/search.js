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
import FacetButton from '../components/search/facet-button'

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

  getFilterGroups = () => {
    const { result: { query, facets } } = this.props

    return Object
      .entries(facets)
      .filter(([name]) => name !== 'keyword')
      .map(([name, values]) => ({
        name,
        values: values.filter(v => !query.facets.some(a => a.name === name && a.value === v.value))
      }))
      .filter(group => group.values.length > 1)
  }

  render() {
    const { result: { query, results, count }, t } = this.props

    const groups = this.getFilterGroups()

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
                <div className='search-bar'>
                  <SearchInput hasButton />
                  {groups.length > 0 && <FacetButton />}
                </div>
                <ActiveFacets facets={query.facets} />
                <Count count={count} />

                <Results results={results} />
              </div>

              <Facets groups={groups} />
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

          .search-bar {
            display: flex;
          }
        `}</style>
      </Page>
    )
  }
}

export default withI18n('search')(SearchPage)
