import React, { Component } from 'react'
import { search, buildSearchQuery } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import SearchInput from '../SearchInput/SearchInput'
import ContentLoader from '../Loader/ContentLoader'
import DatasetPreview from './DatasetPreview'
import { addFilter, removeFilter } from '../../helpers/manageFilters'

const styles = {
  results: {
    margin: '4em',
  },
  searchInputWrapper: {
    margin: '4em',
  }
}

class Datasets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      ...props.query
    }
  }

  componentWillMount() {
    return this.search()
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  search(changes = {}) {
    const params = Object.assign({}, this.state, changes);
    const { textInput, filters, page } = params

    const query = buildSearchQuery(textInput, filters, page)
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${query}`
    history.pushState({path: newUrl}, '', newUrl)

    const allFilters = [...filters, {name: 'availability', value: 'yes'}]
    return waitForDataAndSetState(search(textInput, allFilters, page), this, 'datasets')
  }

  renderResult() {
    if (this.state.errors.length) {
      return <div>An error has occurred.
                {this.state.errors.map((error, idx) => <p key={idx}>{error}</p>)}
              </div>
    }

    if (this.state.datasets) {
      if (!this.state.datasets.results.length) {
        return <div>No datasets found.</div>
      } else {
        return <div>
                {this.state.datasets.results.map((dataset, idx) => <DatasetPreview key={idx} dataset={dataset} addFilter={(filter) => this.addFilter(filter)}/>)}
              </div>
      }
    } else {
      return <ContentLoader />
    }
  }

  addFilter(filter){
    const filters = addFilter(this.state.filters, filter)
    this.setState({filters})
    this.search({filters})
  }

  removeFilter(filter) {
    const filters = removeFilter(this.state.filters, filter)
    this.setState({filters})
    this.search({filters})
  }

  userSearch(textInput) {
    const changes = { textInput, filters: [] }
    this.setState(changes)
    this.search(changes)
  }

  render() {
    return (
        <div>
          <div style={styles.searchInputWrapper}>
            <SearchInput
              textInput={this.state.textInput}
              filters={this.state.filters}
              removeFilter={(filter) => this.removeFilter(filter)}
              handleTextChange={(textInput) => this.userSearch(textInput)} />
          </div>
          <div style={styles.results}>
            {this.renderResult()}
          </div>
        </div>
    )
  }
}

export default Datasets
