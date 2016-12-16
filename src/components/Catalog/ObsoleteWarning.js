import React from 'react'
import { isObsolete } from '../../helpers/catalogs'
import { theme } from '../../tools'

const style = { color: theme.yellow }

const ObsoleteWarning = ({ catalog, refDate }) => {
  if (!isObsolete(catalog, refDate)) return <span />

  return (
    <div style={style}>
      <i className="icon warning"></i> Ce catalogue n'est plus mis à jour
    </div>
  )
}

export default ObsoleteWarning
