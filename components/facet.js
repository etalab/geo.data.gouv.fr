import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const Facet = ({ facet, count, detailed, remove, onClick, t, i18n }) => {
  const title = t(`facets.types.${facet.name}`)
  const value = i18n.exists(`facets.values.${facet.value}`) ? t(`facets.values.${facet.value}`) : facet.value

  return (
    <div className='container'>
      <div className={`facet ${remove && 'remove'}`} onClick={onClick && (() => onClick(facet))}>
        {detailed && <div className='title'>{title}</div>}
        <div className='value'>{value}</div>
      </div>
      {count && <div className='number'>&times; {count}</div>}

      <style jsx>{`
        @import 'colors';

        .container {
          display: flex;
        }

        .facet {
          display: flex;
          flex: 1;
          background: $lightgrey;
          border-radius: 3px 0 0 3px;
          height: 26px;
          line-height: 26px;
          padding: 0 15px 0 23px;
          position: relative;
          text-decoration: none;
          color: $black;
          cursor: pointer;

          &:before {
            background: $white;
            border-radius: 10px;
            box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
            position: absolute;
            content: '';
            height: 6px;
            left: 10px;
            width: 6px;
            top: 10px;
          }

          &:after {
            background: $white;
            border-bottom: 13px solid transparent;
            border-left: 10px solid $lightgrey;
            border-top: 13px solid transparent;
            content: '';
            position: absolute;
            right: 0;
            top: 0;
          }

          &:hover {
            background-color: $blue;
            color: $white;

            &:after {
              border-left-color: $blue;
            }

            &.remove {
              background-color: $red;

              &:after {
                border-left-color: $red;
              }
            }
          }
        }

        .title {
          line-height: 26px;
          height: 26px;
          margin-right: 7px;
          padding-right: 8px;
          border-right: 1px solid rgba(255, 255, 255, 0.7);
          font-variant: small-caps;
        }

        .value {
          max-width: 220px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .title + .value {
          max-width: 160px;
        }

        .number {
          line-height: 26px;
          height: 26px;
          margin-left: 5px;
        }
      `}</style>
    </div>
  )
}

Facet.propTypes = {
  facet: PropTypes.shape({
    name: PropTypes.oneOf([
      'availability',
      'dgvPublication',
      'distributionFormat',
      'keyword',
      'metadataType',
      'opendata',
      'organization',
      'representationType',
      'type',
      'catalog'
    ]).isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,

  count: PropTypes.number,
  detailed: PropTypes.bool,
  remove: PropTypes.bool,
  onClick: PropTypes.func,

  i18n: PropTypes.shape({
    exists: PropTypes.func.isRequired
  }).isRequired,
  t: PropTypes.func.isRequired
}

Facet.defaultProps = {
  detailed: false,
  remove: false
}

export default translate()(Facet)
