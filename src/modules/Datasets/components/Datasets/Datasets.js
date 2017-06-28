import React, { PureComponent } from 'react'

import DatasetsResults from '../DatasetsResults/DatasetsResults'
import SearchInput from '../../../../components/SearchInput/SearchInput'
import Filter from '../../../../components/Filter/Filter'

import { search } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'
import { addFilter, removeFilter } from '../../../../helpers/manageFilters'

import style from './Datasets.css'


class Datasets extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  componentDidMount() {
    const { textInput, filters, page = 1 } = this.props.query

    let allFilters = filters
    const offset = (page - 1) * 20
    return waitForDataAndSetState(search(textInput, allFilters, offset), this, 'datasets')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  addFilter(filter) {
    const {
      query,
      updateQuery
    } = this.props

    updateQuery({
      filters: addFilter(query.filters, filter),
      page: 1
    })
  }

  removeFilter(filter) {
    const {
      query,
      updateQuery
    } = this.props

    updateQuery({
      filters: removeFilter(query.filters, filter),
      page: 1
    })
  }

  userSearch(textInput) {
    return this.props.updateQuery({ textInput, page: 1 })
  }

  handleChangePage({ selected }) {
    const {
      query,
      updateQuery
    } = this.props

    const page = selected + 1

    if (query.page !== page) {
      updateQuery({ page })
    }
  }

  render() {
    const { query } = this.props
    const { datasets, errors } = this.state

    return (
      <div>
        <div className={style.searchWrapper}>
          <SearchInput
            textInput={query.textInput}
            filters={query.filters}
            searchButton={true}
            onSearch={(textInput) => this.userSearch(textInput)} />

          <div className={style.filters}>{query.filters.length ? 'Filtres actifs' : 'Aucun filtre actif'}</div>
          {query.filters.map((filter, idx) => <Filter detail={true} remove={true} key={idx} filter={filter} onClick={(filter) => this.removeFilter(filter)} />)}
        </div>

        <DatasetsResults
          datasets={datasets}
          filters={query.filters}
          page={query.page}
          addFilter={(filter) => this.addFilter(filter)}
          handleChangePage={(data) => this.handleChangePage(data)}
          errors={errors}/>

      </div>
    )
  }
}

export default Datasets
