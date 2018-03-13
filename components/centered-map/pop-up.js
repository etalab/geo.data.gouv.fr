import React from 'react'
import PropTypes from 'prop-types'
import {Popup} from 'react-mapbox-gl'

const PopUp = ({coordinates, features, renderPopUp}) => (
  <Popup coordinates={coordinates}>
    <div className='popup'>
      {renderPopUp(features)}
    </div>
    <style jsx>{`
      .popup {
        background: white;
        color: #3f618c;
        font-weight: 400;
        padding: 5px;
        border-radius: 2px;
      }
      `}</style>
  </Popup>
)

PopUp.propTypes = {
  coordinates: PropTypes.array.isRequired,
  features: PropTypes.array.isRequired,
  renderPopUp: PropTypes.func.isRequired
}

export default PopUp
