import React from 'react'
import DocumentTitle from 'react-document-title'
import { notFound } from './NotFound.scss'

const NotFound = () => {
  return (
    <DocumentTitle title={'Erreur 404'}>
      <div className={notFound}>
        <h1>404</h1>
        <p>Page non trouvée</p>
      </div>
    </DocumentTitle>
  )
}


export default NotFound
