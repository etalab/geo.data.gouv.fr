import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import qs from 'qs'

import DatasetsResults from '../DatasetsResults/DatasetsResults'

import SearchInput from '../../../../components/SearchInput/SearchInput'
import Filter from '../../../../components/Filter/Filter'

import { search } from '../../../../fetch/fetch'
import { convertFilters } from '../../../../helpers/manageFilters'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'
import { addFilter, removeFilter } from '../../../../helpers/manageFilters'

import style from './Datasets.css'


export function buildSearchQuery(q, filters, page) {
  const qsFilters = convertFilters(filters)
  const qPart = (q && q.length) ? { q } : {}
  const pagePart = (page && page > 1) ? { page } : {}
  return qs.stringify({ ...qPart, ...pagePart, ...qsFilters }, { indices: false })
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

    if (this.props.pathname === 'datasets') {
      allFilters = [...filters, {name: 'availability', value: 'yes'}]
    }

    browserHistory.push(`${this.props.pathname}?${query}`)

    return waitForDataAndSetState(search(textInput, allFilters, offset), this, 'datasets')
  }

  addFilter(filter) {
    const filters = addFilter(this.state.filters, filter)
    const changes = { filters, offset: 0, page: 1, datasets: null }

    this.setState(changes)
    this.search(changes)
  }

  removeFilter(filter) {
    const filters = removeFilter(this.state.filters, filter)
    const changes = { filters, offset: 0, page: 1, datasets: null }

    this.setState(changes)
    this.search(changes)
  }

  userSearch(textInput) {
    const changes = { textInput, datasets: null, offset: 0, page: 1 }
    this.setState(changes)
    this.search(changes)
  }

  handleChangePage(data) {
    const limit = this.state.datasets.query.limit
    const selected = data.selected
    const offset = Math.ceil(selected * limit)
    const page = (offset / limit) + 1
    const changes = { page, offset }

    window.scrollTo(0, 0);

    this.setState(changes, () => {
      this.search(changes)
    })
  }

  render() {
    const { textInput, filters, datasets, page, errors } = this.state
    return (
      <div>
        <div className={style.searchWrapper}>
          <SearchInput
            textInput={textInput}
            filters={filters}
            searchButton={true}
            handleTextChange={(textInput) => this.userSearch(textInput)} />

          <div className={style.filters}>{filters.length ? 'Filtres actifs' : 'Aucun filtre actif'}</div>
          {filters.map((filter, idx) => <Filter detail={true} remove={true} key={idx} filter={filter} onClick={(filter) => this.removeFilter(filter)} />)}
        </div>

        <DatasetsResults
          datasets={datasets}
          filters={filters}
          page={page}
          addFilter={(filter) => this.addFilter(filter)}
          handleChangePage={(data) => this.handleChangePage(data)}
          errors={errors}/>

      </div>
    )
  }
}

export default Datasets
