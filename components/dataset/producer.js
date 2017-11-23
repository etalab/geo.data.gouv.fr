import React from 'react'
import PropTypes from 'prop-types'

import withFetch from '../hoc/with-fetch'

const Producer = ({ name, logo }) => (
  <div>
    <div className='wrapper'>
      <img src={logo} alt='' />
    </div>
    <h4>{name}</h4>

    <style jsx>{`
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 160px;
        max-width: 160px;
        margin: auto;
      }

      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
      }

      h4 {
        text-align: center;
      }
    `}</style>
  </div>
)

Producer.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired
}

export default withFetch(data => data.organization)(Producer)
