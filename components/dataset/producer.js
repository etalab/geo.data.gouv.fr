import React from 'react'
import PropTypes from 'prop-types'

import withFetch from '../hoc/with-fetch'

const Producer = ({ data: { logo, name } }) => (
  <div>
    <img src={logo} alt='' />
    <h4>{name}</h4>

    <style jsx>{`
      div {
        text-align: center;
      }

      img {
        display: block;
        margin: auto;
        width: 100%;
        max-width: 160px;
        max-height: 160px;
      }
    `}</style>
  </div>
)

Producer.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  }).isRequired
}

export default withFetch()(Producer)
