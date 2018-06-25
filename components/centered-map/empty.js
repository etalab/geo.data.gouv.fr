import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

const Empty = ({t}) => (
  <div>
    {t('map.emptyDataset')}

    <style jsx>{`
      @import 'colors';

      div {
        display: inline-block;
        background-color: $red;
        color: $white;
        padding: 8px;
        border-radius: 2px;
        text-align: center;
        font-size: 12px;
        line-height: 15px;
      }
    `}</style>
  </div>
)

Empty.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(Empty)
