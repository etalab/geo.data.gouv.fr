import React from 'react'
import PropTypes from 'prop-types'

const Producer = ({ producer }) => (
  <div>
    <img src={producer.logo} alt='' />
    <h4>{producer.name}</h4>

    <style jsx>{`
      div {
        text-align: center;
      }

      img {
        display: block;
        max-width: 100%;
        max-height: 160px;
      }
    `}</style>
  </div>
)

Producer.propTypes = {
  producer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }).isRequired
}

export default Producer
