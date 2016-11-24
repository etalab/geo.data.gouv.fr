import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { search, buildSearchQuery } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'
import SearchInput from '../SearchInput/SearchInput'
import DatasetsResults from './DatasetsResults'
import Filter from '../Filter/Filter'
import { addFilter, removeFilter } from '../../helpers/manageFilters'

const styles = {
  searchInputWrapper: {
    margin: '4em',
  },
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
    let { textInput, filters, offset, page } = params
    const query = buildSearchQuery(textInput, filters, page)
    let allFilters = filters

    if (!offset && page) {
      offset = (page - 1) * 20 // Comment remplacer 20 par limit
    }

    if (this.props.pathname  === 'datasets') {
      allFilters = [...filters, {name: 'availability', value: 'yes'}]
    }

    browserHistory.push(`${this.props.pathname}?${query}`)

    return waitForDataAndSetState(search(textInput, allFilters, offset), this, 'datasets')
  }

  addFilter(filter) {
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
    const changes = { textInput, filters: [], datasets: undefined, offset: undefined, page: undefined }
    this.setState(changes)
    this.search(changes)
  }

  handleChangePage(data) {
    const limit = this.state.datasets.query.limit
    const selected = data.selected
    const offset = Math.ceil(selected * limit)
    const page = (offset / limit) + 1
    const changes = { page, offset }

    this.setState(changes, () => {
      this.search(changes)
    })
  }

  render() {
    return (
      <div>
        <div style={styles.searchInputWrapper}>
          <SearchInput
            textInput={this.state.textInput}
            filters={this.state.filters}
            searchButton={true}
            handleTextChange={(textInput) => this.userSearch(textInput)} />
        </div>

        <DatasetsResults
          datasets={this.state.datasets}
          filters={this.state.filters}
          page={this.state.page}
          addFilter={(filter) => this.addFilter(filter)}
          handleChangePage={(data) => this.handleChangePage(data)}
          errors={this.state.errors}/>

          {this.state.filters.map((filter, idx) => <Filter key={idx} filter={filter} onClick={(filter) => this.removeFilter(filter)} />)}

      </div>
    )
  }
}

export default Datasets
