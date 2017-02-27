import React from 'react'

import Check from './Check'

const CheckProducers = ({ valid, organizations }) => {
  const msg = valid ? 'Au moins un producteur est identifié.' : 'Le producteur n\'a pas été identifié.'

  return (
    <Check title='Producteur' isValid={valid} msg={msg}>
      {organizations ? organizations : null }
    </Check>
    )
}

export default CheckProducers
