import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import WarningIcon from 'react-icons/lib/fa/exclamation-triangle'

const Warning = ({ status, t }) => (
  <div>
    <span className='icon'>
      <WarningIcon />
    </span>
    {t(`warnings.${status}`)}

    <style jsx>{`
      @import 'colors';

      div {
        background-color: lighten($yellow, 45%);
        padding: 0.8em;
        border-radius: 3px;
        margin-bottom: 1em;
        display: flex;
        align-items: center;
      }

      .icon {
        color: lighten($yellow, 20%);
        font-size: 2em;
        margin-right: 1rem;
      }
    `}</style>
  </div>
)

Warning.propTypes = {
  status: PropTypes.oneOf([
    'obsolete',
    'underDevelopment'
  ]).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(Warning)
