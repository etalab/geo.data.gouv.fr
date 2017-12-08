import React from 'react'
import PropTypes from 'prop-types'

import Result from './result'

const Results = ({ results }) => (
  <div>
    {results.map(result => (
      <div key={result._id}>
        <Result result={result} />
      </div>
    ))}
  </div>
)

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired
}

export default Results
