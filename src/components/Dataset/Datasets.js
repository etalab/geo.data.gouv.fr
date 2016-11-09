import React, { Component } from 'react'
import { search } from '../../fetch/fetch'
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
      baseUrl: 'https://inspire.data.gouv.fr/api/geogw/records',
      errors: [],
      ...props.query
    }
  }

  componentWillMount() {
    return this.search({...this.state, filters: addFilter(this.state.filters, {name: 'availability', value: 'yes'})})
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  search(newState) {
    const { baseUrl, textInput, filters, page} = newState

    this.setState(newState)

    return waitForDataAndSetState(search(baseUrl, textInput, filters, page), this, 'datasets')
  }

  displayResult() {
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
                {this.state.datasets.results.map((dataset, idx) => <DatasetPreview key={idx} dataset={dataset} onClick={this.addFilter.bind(this)}/>)}
              </div>
      }
    } else {
      return <ContentLoader />
    }
  }

  addFilter(filter){
    this.search({...this.state, filters: addFilter(this.state.filters, filter) })
  }

  removeFilter(filter) {
    this.search({...this.state, filters: removeFilter(this.state.filters, filter) })
  }

  handleTextChange(textInput) {
    this.search({...this.state, textInput})
  }

  render() {
    console.log(this.state);
    return (
        <div>
          <div style={styles.searchInputWrapper}>
            <SearchInput
              style={styles.searchInput}
              textInput={this.state.textInput}
              filters={this.state.filters}
              removeFilter={this.removeFilter.bind(this)}
              handleTextChange={this.handleTextChange.bind(this)} />
          </div>
          <div style={styles.results}>
            {this.displayResult()}
          </div>
        </div>
    )
  }
}

export default Datasets
