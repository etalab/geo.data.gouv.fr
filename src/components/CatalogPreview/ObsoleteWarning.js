import React from 'react'
import { isObsolete } from '../../helpers/catalogs'
import { container } from './ObsoleteWarning.css'

// When testing you may need to define the current date to avoid test cases obsolescence
const ObsoleteWarning = ({ catalog, currentDate }) => {
  if (!isObsolete(catalog, currentDate)) return <span />

  return (
    <div className={container}>
      <i className="icon warning"></i> Ce catalogue n'a pas été mis à jour depuis plus de 6 mois
    </div>
  )
}

export default ObsoleteWarning
