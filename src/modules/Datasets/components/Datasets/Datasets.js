import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import qs from 'qs'

import DatasetsResults from '../DatasetsResults/DatasetsResults'
import SearchInput from '../../../../components/SearchInput/SearchInput'
import Filter from '../../../../components/Filter/Filter'
import ToggleSwitch from '../../../../components/ToggleSwitch/ToggleSwitch'

import { search } from '../../../../fetch/fetch'
import { convertFilters } from '../../../../helpers/manageFilters'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'
import { addFilter, removeFilter, isActive } from '../../../../helpers/manageFilters'

import style from './Datasets.css'

const availabilityFilter = { name: 'availability', value: 'yes' }

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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.query || this.props.query === nextProps.query) return
    this.search(nextProps.query, false)
  }

  componentDidMount() {
    return this.fetchRecords()
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  fetchRecords() {
    const { textInput, filters, page = 1 } = this.state
    let allFilters = filters
    const offset = (page - 1) * 20
    return waitForDataAndSetState(search(textInput, allFilters, offset), this, 'datasets')
  }

  pushToHistory() {
    let { textInput, filters, page } = this.state
    const query = buildSearchQuery(textInput, filters, page)
    if (window.location.search === `?${query}`) return
    browserHistory.push('/search?' + query)
  }

  search(changes = {}, pushToHistory = true) {
    window.scrollTo(0, 0);
    return this.setState(changes, () => {
      if (pushToHistory) this.pushToHistory()
      return this.fetchRecords()
    })
  }

  toggleSwitch() {
    if (isActive(this.state.filters, availabilityFilter)) {
      this.removeFilter(availabilityFilter)
    } else {
      this.addFilter(availabilityFilter)
    }
  }

  addFilter(filter) {
    const filters = addFilter(this.state.filters, filter)
    return this.search({ filters, page: 1, datasets: null })
  }

  removeFilter(filter) {
    const filters = removeFilter(this.state.filters, filter)
    return this.search({ filters, page: 1, datasets: null })
  }

  userSearch(textInput) {
    return this.search({ textInput, datasets: null, page: 1 })
  }

  handleChangePage({ selected }) {
    return this.search({ page: selected + 1 })
  }

  render() {
    const { textInput, filters, datasets, page, errors } = this.state
    const availabiliyIsActive = isActive(this.state.filters, availabilityFilter)

    return (
      <div>
        <div className={style.searchWrapper}>
          <SearchInput
            textInput={textInput}
            filters={filters}
            searchButton={true}
            onSearch={(textInput) => this.userSearch(textInput)} />

          <div className={style.searchFilters}>
            <div>
              <div className={style.filters}>{filters.length ? 'Filtres actifs' : 'Aucun filtre actif'}</div>
              {filters.map((filter, idx) => <Filter detail={true} remove={true} key={idx} filter={filter} onClick={(filter) => this.removeFilter(filter)} />)}
            </div>
            <div className={style.searchSwitch}>
              <ToggleSwitch action={() => this.toggleSwitch()} active={availabiliyIsActive}/>
              <div>Disponible sur data.gouv.fr</div>
            </div>
          </div>
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
