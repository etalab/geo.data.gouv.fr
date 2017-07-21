import React from 'react'
import PropTypes from 'prop-types'

const SearchResultsCount = ({ count }) => !count ? (
  <div>
    Aucun jeu de données trouvé.
  </div>
) : count === 1 ? (
  <div>
    <strong>{count}</strong> jeu de données trouvé.
  </div>
) : (
  <div>
    <strong>{count}</strong> jeux de données trouvés.
  </div>
)

SearchResultsCount.propTypes = {
  count: PropTypes.number.isRequired
}

export default SearchResultsCount
