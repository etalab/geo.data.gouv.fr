import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

const Feature = ({feature, otherFeaturesCount, t}) => (
  <div>
    <ul>
      {Object.keys(feature.properties).map(key =>
        <li key={key}><b>{key} :</b> {feature.properties[key]}</li>
      )}
    </ul>

    {otherFeaturesCount > 0 && (
      <i>{t('map.additionalFeature', {count: otherFeaturesCount})}</i>
    )}

    <style jsx>{`
      @import 'colors';

      div {
        background-color: $white;
        padding: 5px;
        border-radius: 2px;
      }

      ul {
        list-style-position: inside;
        margin: 0;
        padding: 0;
      }

      i {
        display: block;
        margin-top: 10px;
      }
    `}</style>
  </div>
)

Feature.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.object.isRequired
  }).isRequired,
  otherFeaturesCount: PropTypes.number.isRequired,

  t: PropTypes.func.isRequired
}

export default translate()(Feature)
