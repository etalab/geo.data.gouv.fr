import React from 'react'

import Check from './Check'
import CheckItem from './CheckItem'

const DatasetDataAvailability = ({ valid, distributions }) => {
  let content = null
  const msg = valid ?
    'Au moins une des distribution est disponible.' :
    'Aucune distribution n\'a été trouvée.'

  if (valid) {
    content = distributions.map((distribution, idx) => {
      const name = distribution.typeName || distribution.layer || distribution.name
      return <CheckItem key={idx} name={name} valid={distribution.available} />
    })
  }

  return (
    <Check title='Disponibilité de la donnée' isValid={valid} msg={msg}>
      {content}
    </Check>
    )
}

export default DatasetDataAvailability
