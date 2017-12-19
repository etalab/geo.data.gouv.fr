import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {translate} from 'react-i18next'

import licenses from '../../../lib/licenses'

const Infos = ({metadata, t}) => {
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

  const category = t([`common:enums.topicCategories.${metadata.topicCategory}`, 'common:enums.unknownData.notSpecified'], {
    context: 'female'
  })

  const updatedAt = metadata.revisionDate || metadata.creationDate
  const updatedAtLabel = updatedAt ?
    moment(updatedAt).fromNow() :
    t('common:enums.unknownData.unknown', {
      context: 'female'
    })

  const {
    equivalentScaleDenominator: scale,
    spatialResolution: resolution
  } = metadata

  return (
    <div>
      <span>
        {t('labels.type')} <b>{dataType}</b>
      </span>

      <span>
        {t('labels.license')} <b>{licenseLink ? (
          <a href={licenseLink} rel='noopener noreferrer' target='_blank'>{license}</a>
        ) : license}</b>
      </span>

      <span>
        {t('labels.category')} <b>{category}</b>
      </span>

      {scale && <span>
        {t('labels.scale')} <b>1 / {scale}</b>
      </span>}

      {resolution && <span>
        {t('labels.resolution')} <b>{resolution.value} {t(`enums.resolutionUnits.${resolution.unit}`, {
          count: resolution.value
        })}</b>
      </span>}

      <span>
        {t('labels.lastUpdate')} <b>{updatedAtLabel}</b>
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
    topicCategory: PropTypes.string,
    creationDate: PropTypes.string,
    revisionDate: PropTypes.string,
    equivalentScaleDenominator: PropTypes.number,
    spatialResolution: PropTypes.shape({
      value: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired
    })
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(Infos)
