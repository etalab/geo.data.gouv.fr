import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

import licenses from '../../../lib/licenses'

const Infos = ({ metadata, t }) => {
  const dataType = t(`common:enums.dataTypes.${metadata.type}`, {
    defaultValue: metadata.type
  })

  let license
  let licenseLink

  if (metadata.license) {
    const found = licenses[metadata.license]

    if (found) {
      license = found.name
      licenseLink = found.link
    } else {
      license = t('common:enums.unknownData.unknown', {
        context: 'female'
      }) + ' (' + metadata.license + ')'
    }
  } else {
    license = t('common:enums.unknownData.notSpecified', {
      context: 'female'
    })
  }

  const updatedAt = metadata.revisionDate || metadata.creationDate
  const updatedAtLabel = updatedAt
    ? moment(updatedAt).fromNow()
    : t('common:enums.unknownData.unknown', {
      context: 'female'
    })

  return (
    <div>
      <span>
        {t('type')} : <b>{dataType}</b>
      </span>
      <span>
        {t('license')} : <b>{licenseLink ? (
          <a href={licenseLink} rel='noopener noreferrer' target='_blank'>{license}</a>
        ) : license}</b>
      </span>
      <span>
        {t('lastUpdate')} : <b>{updatedAtLabel}</b>
      </span>

      <style jsx>{`
        @import 'colors';

        div {
          font-size: small;
        }

        span {
          display: inline-block;
          margin-right: 1em;
        }

        b {
          margin-left: 0.3em;
          font-weight: bold;
          color: $blue;
        }

        a {
          color: inherit;

          &:hover {
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  )
}

Infos.propTypes = {
  metadata: PropTypes.shape({
    license: PropTypes.string,
    creationDate: PropTypes.string,
    revisionDate: PropTypes.string
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(Infos)
