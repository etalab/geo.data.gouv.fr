import React from 'react'

import DatasetPreview from '../DatasetPreview/DatasetPreview'
import Facets from '../../../../components/Facets/Facets'
import ContentLoader from '../../../../components/Loader/ContentLoader'
import WrappedPagination from '../../../../components/Pagination/WrappedPagination'

import { loader, results, result, counter, paginationWrapper } from './DatasetsResults.css'

const DatasetsResults = ({datasets, filters, page, addFilter, handleChangePage, errors}) => {
  if (!!errors.length) {
    return <div>Une erreur est survenue.
              {errors.map((error, idx) => <p key={idx}>{error}</p>)}
            </div>
  }

  if (!datasets) {
    return <div className={loader}><ContentLoader /></div>
  }

  if (!datasets.count) {
    return <div className={results}>Aucun jeu de données trouvé.</div>
  }

  const max = datasets ? Math.ceil(datasets.count / datasets.query.limit) : 0
  return <div>
          <div className={counter}><strong>{datasets.count}</strong> {datasets.count > 1 ? 'jeux de données trouvés' : 'jeu de données trouvé'}</div>
          <div className={results}>
            <div className={result}>
              {datasets.results.map(dataset => <DatasetPreview key={dataset._id} dataset={dataset} addFilter={(filter) => addFilter(filter)}/>)}
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
