import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

const Feature = ({properties, otherFeaturesCount, t}) => (
  <div>
    <ul>
      {Object.keys(properties).map(key =>
        <li key={key}><b>{key} :</b> {properties[key]}</li>
      )}
    </ul>

    {otherFeaturesCount > 0 && (
      <i>{t('map.additionalFeature', {count: otherFeaturesCount})}</i>
    )}

    <style jsx>{`
      @import 'colors';

      div {
        background-color: $white;
        padding: 8px;
        border-radius: 2px;
        font-size: 12px;
        line-height: 15px;
        border: 1px solid $black;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      i {
        display: block;
        margin-top: 6px;
      }
    `}</style>
  </div>
)

Feature.propTypes = {
  properties: PropTypes.object.isRequired,
  otherFeaturesCount: PropTypes.number.isRequired,

  t: PropTypes.func.isRequired
}

export default translate()(Feature)
