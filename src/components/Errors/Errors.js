import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import { container } from './Errors.scss'

const Errors = ({ errors }) => {
  const title = errors.length > 1 ? <h3>Des erreurs sont survenues</h3> : <h3>Une erreur est survenue</h3>
  return (
    <div>
      <Helmet title={'Erreur'} />
      <div className={container}>
        {title}
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
    </div>
  )
}

Errors.propTypes = {
  errors: PropTypes.array.isRequired
}

export default Errors
