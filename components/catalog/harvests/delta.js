import React from 'react'
import PropTypes from 'prop-types'

import UpIcon from 'react-icons/lib/fa/long-arrow-up'
import DownIcon from 'react-icons/lib/fa/long-arrow-down'

const Delta = ({ harvest, previous }) => {
  if (!previous) {
    return (
      <div>–</div>
    )
  }

  const delta = harvest.itemsFound - previous.itemsFound

  if (delta > 0) {
    return (
      <div>
        <span><UpIcon /></span> +{delta}

        <style jsx>{`
          @import 'colors';

          span {
            color: $green;
          }
        `}</style>
      </div>
    )
  }

  if (delta < 0) {
    return (
      <div>
        <span><DownIcon /></span> {delta}

        <style jsx>{`
          @import 'colors';

          span {
            color: $red;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div>0</div>
  )
}

Delta.propTypes = {
  harvest: PropTypes.shape({
    itemsFound: PropTypes.number.isRequired
  }).isRequired,

  previous: PropTypes.shape({
    itemsFound: PropTypes.number.isRequired
  })
}

export default Delta
