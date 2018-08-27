import {stringify} from 'querystring'
import React from 'react'
import PropTypes from 'prop-types'
import {flowRight} from 'lodash'
import getConfig from 'next/config'

import {_get} from '../lib/fetch'
import {getFilters} from '../lib/query'

import attachI18n from '../components/hoc/attach-i18n'
import withErrors from '../components/hoc/with-errors'

import Page from '../components/page'
import Content from '../components/content'
import Container from '../components/container'
import Meta from '../components/meta'
import SearchInput from '../components/search-input'

import ActiveFacets from '../components/search/active-facets'
import Count from '../components/search/count'
import Results from '../components/search/results'
import Paging from '../components/search/paging'
import Facets from '../components/search/facets'
import FacetButton from '../components/search/facet-button'

const {publicRuntimeConfig: {
  GEODATA_API_URL
}} = getConfig()

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
    }),

    t: PropTypes.func.isRequired,
    tReady: PropTypes.bool.isRequired
  }

  static defaultProps = {
    result: null
  }

  static async getInitialProps({query}) {
    let page = parseInt(query.p, 10) || 1
    if (page < 1) {
      page = 1
    }

    return {
      result: await _get(`${GEODATA_API_URL}/records?${stringify({
        q: query.q,
        limit: 20,
        offset: (page - 1) * 20,
        ...getFilters(query)
      })}`)
    }
  }

  state = {
    showFacets: false
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      showFacets: false
    })
  }

  getFilterGroups = () => {
    const {result: {query, facets, count}} = this.props

    if (count === 1) {
      return []
    }

    return Object
      .entries(facets)
      .filter(([name]) => name !== 'keyword')
      .map(([name, values]) => ({
        name,
        values: values.filter(v => (
          v.count !== count && !query.facets.some(a => a.name === name && a.value === v.value)
        ))
      }))
      .filter(group => group.values.length > 1)
  }

  toggleFacets = () => {
    this.setState(state => ({
      showFacets: !state.showFacets
    }))
  }

  closeFacets = () => {
    this.setState({
      showFacets: false
    })
  }

  render() {
    const {result: {query, results, count}, t, tReady} = this.props
    const {showFacets} = this.state

    const groups = this.getFilterGroups()

    return (
      <Page ready={tReady}>
        {() => (
          <React.Fragment>
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
                      {groups.length > 0 && <FacetButton onClick={this.toggleFacets} />}
                    </div>
                    <ActiveFacets facets={query.facets} />
                    <Count count={count} />

                    <Results results={results} />
                    {count > 0 && <Paging count={count} query={query} />}
                  </div>

                  <Facets groups={groups} open={showFacets} onClose={this.closeFacets} />
                </div>
              </Container>
            </Content>

            <style jsx global>{`
              body {
                @media (max-width: 960px) {
                  ${showFacets && 'overflow: hidden;'}
                }
              }
            `}</style>

            <style jsx>{`
              .main {
                display: flex;
                margin-bottom: 4em;
              }

              .search {
                flex: 1;
              }

              .search-bar {
                display: flex;
              }
            `}</style>
          </React.Fragment>
        )}
      </Page>
    )
  }
}

export default flowRight(
  attachI18n(['search', 'dataset']),
  withErrors
)(SearchPage)
