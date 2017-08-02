import React from 'react'
import PropTypes from 'prop-types'

import Check from './Check'

const CheckProducers = ({ valid, organizations }) => {
  const msg = valid
    ? 'Au moins un producteur est identifié.'
    : 'Le producteur n’a pas été identifié.'

  return (
    <Check title='Producteur' isValid={valid} msg={msg}>
      {organizations || null }
    </Check>
  )
}

CheckProducers.propTypes = {
  valid: PropTypes.bool,
  organizations: PropTypes.arrayOf(PropTypes.string)
}

CheckProducers.defaultProps = {
  valid: false
}

export default CheckProducers
