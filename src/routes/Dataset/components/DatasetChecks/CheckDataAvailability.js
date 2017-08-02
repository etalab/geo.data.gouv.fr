import React from 'react'
import PropTypes from 'prop-types'

import Check from './Check'
import CheckItem from './CheckItem'

const CheckDataAvailability = ({ valid, distributions }) => {
  const msg = valid
    ? 'Au moins une des distribution est disponible.'
    : 'Aucune distribution n’a été trouvée.'

  return (
    <Check title='Disponibilité de la donnée' isValid={valid} msg={msg}>
      {valid && distributions.map(distribution => (
        <CheckItem
          key={distribution._id}
          name={distribution.typeName || distribution.layer || distribution.name}
          valid={distribution.available}
        />
      ))}
    </Check>
  )
}

CheckDataAvailability.propTypes = {
  valid: PropTypes.bool,
  distributions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    available: PropTypes.bool,
    typeName: PropTypes.string,
    layer: PropTypes.string,
    name: PropTypes.string
  })).isRequired
}

CheckDataAvailability.defaultProps = {
  valid: false
}

export default CheckDataAvailability
