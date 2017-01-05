import React from 'react'
import { notFound } from './NotFound.css'

const NotFound = () => {
  document.title = 'Erreur 404'
  return (
    <div className={notFound}>
      <h1>404</h1>
      <p>Page non trouvée</p>
    </div>
  )
}


export default NotFound
