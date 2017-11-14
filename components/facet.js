import { format } from 'url'
import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withRouter } from 'next/router'

import Link from './link'

class Facet extends React.Component {
  static propTypes = {
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
    removable: PropTypes.bool,

    router: PropTypes.shape({
      query: PropTypes.object.isRequired
    }).isRequired,

    i18n: PropTypes.shape({
      exists: PropTypes.func.isRequired
    }).isRequired,

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    detailed: false,
    removable: false
  }

  getAddQuery = facet => {
    const { router } = this.props

    let query
    if (router.pathname === '/search') {
      query = {
        ...router.query
      }

      delete query.p

      const match = query[facet.name]
      if (Array.isArray(match)) {
        query[facet.name] = [
          ...match,
          facet.value
        ]
      } else if (match) {
        query[facet.name] = [match, facet.value]
      } else {
        query[facet.name] = facet.value
      }
    } else {
      query = {
        [facet.name]: facet.value
      }
    }

    return query
  }

  getRemoveQuery = facet => {
    const { router } = this.props

    const query = {
      ...router.query
    }

    delete query.p

    const match = query[facet.name]
    if (Array.isArray(match)) {
      query[facet.name] = match.filter(v => v !== facet.value)
    } else {
      delete query[facet.name]
    }

    return query
  }

  getLink = () => {
    const { removable, facet } = this.props

    const query = removable ? this.getRemoveQuery(facet) : this.getAddQuery(facet)

    return format({
      pathname: '/search',
      query
    })
  }

  render() {
    const { facet, count, detailed, removable, t, i18n } = this.props

    const title = t(`facets.types.${facet.name}`)
    const value = i18n.exists(`facets.values.${facet.value}`) ? t(`facets.values.${facet.value}`) : facet.value

    return (
      <div className='container'>
        <Link href={this.getLink()}>
          <a className={`facet ${removable && 'removable'}`}>
            {detailed && <div className='title'>{title}</div>}
            <div className='value'>{value}</div>
          </a>
        </Link>
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

            max-width: 100%;
            overflow: hidden;

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

              &.removable {
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
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            &:first-letter {
              text-transform: capitalize;
            }
          }

          .title + .value {
            max-width: 380px;

            @media (max-width: 960px) {
              max-width: 280px;
            }

            @media (max-width: 767px) {
              max-width: 180px;
            }

            @media (max-width: 551px) {
              max-width: 120px;
            }
          }

          .number {
            line-height: 26px;
            height: 26px;
            margin-left: 4px;
            font-size: 0.9em;

            @media (max-width: 551px) {
              margin-left: 2px;
              font-size: 0.8em;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate()(withRouter(Facet))
