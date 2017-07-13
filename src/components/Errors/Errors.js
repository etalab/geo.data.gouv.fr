import React from 'react'
import DocumentTitle from 'react-document-title'

import { container } from './Errors.scss'

const Errors = ({ errors }) => {
  const title = errors.length > 1 ? <h3>Des erreurs sont survenues</h3> : <h3>Une erreur est survenue</h3>
  return (
    <DocumentTitle title={'Erreur'}>
      <div className={container}>
        {title}
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
    </DocumentTitle>
  )
}

export default Errors
