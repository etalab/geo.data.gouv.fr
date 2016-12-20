import React from 'react'
import Facets from '../Facets/Facets'
import DatasetPreview from './DatasetPreview'
import ContentLoader from '../Loader/ContentLoader'
import WrappedPagination from '../Pagination/WrappedPagination'
import { loader, results, result, paginationWrapper } from './DatasetsResults.css'

const DatasetsResults = ({datasets, filters, page, addFilter, handleChangePage, errors}) => {
  if (!!errors.length) {
    return <div>Une erreur est survenue.
              {errors.map((error, idx) => <p key={idx}>{error}</p>)}
            </div>
  }

  if (!datasets) {
    return <div className={loader}><ContentLoader /></div>
  }

  if (!datasets.results.length) {
    return <div className={results}>Aucun jeu de données trouvé.</div>
  }

  const max = datasets ? Math.ceil(datasets.count / datasets.query.limit) : 0
  return <div>
          <div className={results}>
            <div className={result}>
              {datasets.results.map((dataset, idx) => <DatasetPreview key={idx} dataset={dataset} addFilter={(filter) => addFilter(filter)}/>)}
            </div>
            <Facets
              facets={datasets.facets}
              filters={filters}
              addFilter={(filter) => addFilter(filter)} />
          </div>

          <div className={paginationWrapper}>
            <WrappedPagination max={max} page={page} handleChangePage={handleChangePage} />
          </div>
        </div>
}

export default DatasetsResults
