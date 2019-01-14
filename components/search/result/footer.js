import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {translate} from 'react-i18next'

import licenses from '../../../lib/licenses'

const Footer = ({result, t}) => {
  let license

  if (result.license) {
    const found = licenses[result.license]

    if (found) {
      license = found.name
    } else {
      license = t('common:enums.unknownData.unknown', {
        context: 'female'
      }) + ' (' + result.license + ')'
    }
  } else {
    license = t('common:enums.unknownData.notSpecified', {
      context: 'female'
    })
  }

  const updatedAtLabel = result.revisionDate ?
    moment(result.revisionDate).fromNow() :
    t('common:enums.unknownData.unknown', {
      context: 'female'
    })

  return (
    <div>
      <span>
        {t('labels.license')} <b>{license}</b>
      </span>
      <span>
        {t('labels.lastUpdate')} <b>{updatedAtLabel}</b>
      </span>

      <style jsx>{`
        @import 'colors';

        div {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          font-size: small;
        }

        span {
          margin-right: 1em;

          &:last-child {
            margin-right: 0;
          }
        }

        b {
          margin-left: 0.3em;
          font-weight: 600;
          color: $blue;
        }
      `}</style>
    </div>
  )
}

Footer.propTypes = {
  result: PropTypes.shape({
    license: PropTypes.string,
    revisionDate: PropTypes.string
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(Footer)
