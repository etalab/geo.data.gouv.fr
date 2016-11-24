import React from 'react'
import Facets from '../Facets/Facets'
import DatasetPreview from './DatasetPreview'
import ContentLoader from '../Loader/ContentLoader'
import WrappedPagination from '../Pagination/WrappedPagination'

const styles = {
  results: {
    display: 'flex',
    margin: '4em',
  },
  loader: {
    textAlign: 'center',
    marginTop: '5em',
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 4em 2em',
  },
}

const DatasetsResults = ({datasets, filters, page, addFilter, handlePageClick, errors}) => {
  if (!!errors.length) {
    return <div>Une erreur est survenue.
              {errors.map((error, idx) => <p key={idx}>{error}</p>)}
            </div>
  }

  if (!datasets) {
    return <div style={styles.loader}><ContentLoader /></div>
  }

  if (!datasets.results.length) {
    return <div style={styles.results}>Aucun jeu de données trouvé.</div>
  }

  const max = datasets ? Math.ceil(datasets.count / datasets.query.limit) : 0
  return <div>
          <div style={styles.results}>
            <div>
              {datasets.results.map((dataset, idx) => <DatasetPreview key={idx} dataset={dataset} addFilter={(filter) => addFilter(filter)}/>)}
            </div>
            <Facets
              facets={datasets.facets}
              filters={filters}
              addFilter={(filter) => addFilter(filter)} />
          </div>

          <div style={styles.paginationWrapper}>
            <WrappedPagination max={max} initialSelected={page} handlePageClick={handlePageClick} />
          </div>
        </div>
}

export default DatasetsResults
